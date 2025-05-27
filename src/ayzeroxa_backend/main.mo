import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Bool "mo:base/Bool";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Char "mo:base/Char";
import Nat8 "mo:base/Nat8";
import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";


 actor Axa {
    // Roles
    public type Role = {
        #admin;
        #leader;
        #user;
        #viewer;
    };

    public type UserInfo = {
        role: Role;
        authenticated: Bool;
    };

    // Define user Data Structure
      public type User = {
        id: Text;
        firstName: Text;
        surName: Text;
        gender: Text;
        dob: Text;
        mob: Text;
        channel: Text;
        tel: Text;
        address: Text;
        town: Text;
        status: Text;
        category: Text;
        unit: Text;
        createdAt: Text;
      };

      public type Attendance = {
         id: Text;
         name: Text;
         status: Text;
         gender: Text;
         category: Text;
         town: Text;
         channel: Text;
         createdAt: Text;
      };

      type FirstTimerStatus = {
            info: Attendance;
            absent: Nat;
            lastAttended: Text;
        };

    
    // Stable storage: Stores the HashMap data as an array during upgrades
    
        stable var encryptedUserList : Blob = Blob.fromArray([]);
        stable var userList: [(Text, User)] = [];
        stable var stableDailyAttendees : [(Text, [(Text, Attendance)])] = [];
        // stableDailyAttendees:= [];
        stable var storedUsers : [(Principal, UserInfo)] = [];
        // userList:= [];

        // storage
        var users = HashMap.HashMap<Text, User>(10, Text.equal, Text.hash);
        var dailyAttendees = HashMap.HashMap<Text, HashMap.HashMap<Text, Attendance>>(10, Text.equal, Text.hash);
        var userRoles = HashMap.HashMap<Principal, UserInfo>(10, Principal.equal, Principal.hash);
            // Secret Key for XOR Encryption
        let secretKey = "mySecretKey"; // Keep this secret

        /// XOR Encryption/Decryption
        func xorEncryptDecrypt(input: Text, key: Text) : Blob {
            let inputBlob = Text.encodeUtf8(input);
            let keyBlob = Text.encodeUtf8(key);

            let keyArray = Blob.toArray(keyBlob);
            let keySize = keyArray.size();  // ✅ Fix: Use .size()

            let encryptedArray = Array.tabulate<Nat8>(
                Blob.toArray(inputBlob).size(),  // ✅ Fix: Use .size()
                func(index: Nat) : Nat8 {
                    let inputArray = Blob.toArray(inputBlob);
                    let keyByte = keyArray[index % keySize];
                    inputArray[index] ^ keyByte // XOR operation
                }
            );

            return Blob.fromArray(encryptedArray);
        };

        // 🔹 Encrypts the entire user list
        func encryptUserList() {
            let userArray = Iter.toArray(users.entries());
            let userJson = debug_show(userArray); // Convert to a JSON-like text
            encryptedUserList := xorEncryptDecrypt(userJson, secretKey);
            Debug.print("User list encrypted successfully!");
        };

        // 🔹 Retrieve encrypted user list
        public query func getEncryptedUsers() : async Blob {
            return encryptedUserList;
        };
        
        // Escape special characters in Text for JSON safety

            // 🔹 Retrieve decrypted user list
        public query func getDecryptedUsers() : async Text {
            switch (Text.decodeUtf8(encryptedUserList)) {
                case (?encryptedText) {
                    let decryptedBlob = xorEncryptDecrypt(encryptedText, secretKey);
                    switch (Text.decodeUtf8(decryptedBlob)) {
                        case (?decryptedText) decryptedText;
                        case null "Decryption Failed";
                    };
                };
                case null "Decryption Failed";
            }
        };

        public func decrypt(encryptedData: Blob) : async Text {
            switch (Text.decodeUtf8(encryptedData)) {
                case (?decodedText) {
                    let decryptedBlob = xorEncryptDecrypt(decodedText, secretKey);
                    switch (Text.decodeUtf8(decryptedBlob)) {
                        case (?decryptedText) decryptedText;
                        case null "Decryption Failed";
                    };
                };
                case null "Decryption Failed";
            };
        };

        // decrypted chuck
        public query func decryptChunk(chunk: Blob) : async Text {
            switch (Text.decodeUtf8(chunk)) {
                case (?decodedChunk) {
                let decryptedBlob = xorEncryptDecrypt(decodedChunk, secretKey);
                switch (Text.decodeUtf8(decryptedBlob)) {
                    case (?decryptedText) decryptedText;
                    case null "Chunk Decryption Failed";
                };
                };
                case null "Chunk Decryption Failed";
            };
            };

            


        // Separate backup for users
        func backupUsers() {
            userList := Iter.toArray(users.entries()); // Save users before upgrade
        };

        // Separate backup for attendees
        func backupDailyAttendees() {
            stableDailyAttendees := Iter.toArray(
                Iter.map<(Text, HashMap.HashMap<Text, Attendance>), (Text, [(Text, Attendance)])>(
                    dailyAttendees.entries(),
                    func ((date: Text, attendanceMap: HashMap.HashMap<Text, Attendance>)) : (Text, [(Text, Attendance)]) {
                        (date, Iter.toArray(attendanceMap.entries()))
                    }
                )
            );
        };
        // separate backup for userInfo
        func backupUserInfo() {
            storedUsers := Iter.toArray(userRoles.entries()); // Save userInfo before upgrade
        };

        // Separate restore for users
        func restoreUsers() {
            users := HashMap.fromIter<Text, User>(Iter.fromArray(userList), 10, Text.equal, Text.hash);
            encryptUserList(); // Re-encrypt after restoring users
        };

        // Separate restore for attendees
        func restoreDailyAttendees() {
                dailyAttendees := HashMap.HashMap<Text, HashMap.HashMap<Text, Attendance>>(10, Text.equal, Text.hash);
                for ((date, records) in stableDailyAttendees.vals()) {
                    let innerMap = HashMap.HashMap<Text, Attendance>(10, Text.equal, Text.hash);
                    for ((id, record) in records.vals()) {
                    innerMap.put(id, record);
                    };
                    dailyAttendees.put(date, innerMap);
                };
                };

        // Separate restore for userInfo
        func restoreUserInfo() {
            userRoles := HashMap.fromIter<Principal, UserInfo>(Iter.fromArray(storedUsers), 10, Principal.equal, Principal.hash);
        };

        // 🔹 Backup user list before upgrade
        system func preupgrade() {
            backupUsers();
            backupDailyAttendees();
            backupUserInfo();
        };

        // 🔹 Restore user list after upgrade
        system func postupgrade() {
           restoreDailyAttendees();
           restoreUsers();
           restoreUserInfo();
            // Set yourself as admin and authenticated
           let initialAdmin : Principal = Principal.fromText("gpohr-4pike-zrtuk-7csq7-m6vnu-4cxpv-jvy22-km7e7-diq6c-x7nvz-2qe");
             
            if (userRoles.get(initialAdmin) == null) {
                userRoles.put(initialAdmin, {
                    role = #admin;
                    authenticated = true;
                });
                };
        };

        /// Function to convert a Text string to lowercase
        func toLowercase(text: Text) : Text {
            Text.map(text, func(c: Char) : Char {
                let code = Char.toNat32(c);
                if (code >= 65 and code <= 90) { // 'A' to 'Z'
                    return Char.fromNat32(code + 32); // Convert to lowercase
                } else {
                    return c;
                }
            })
        };

        // Function to check if a user with the same firstName and surName exists
        public query func userExists(firstName: Text, surName: Text) : async Bool {
            let lowerFirstName = toLowercase(firstName);
            let lowerSurName = toLowercase(surName);

            for ((_, user) in users.entries()) {
                if (toLowercase(user.firstName) == lowerFirstName and 
                    toLowercase(user.surName) == lowerSurName) {
                    return true; // Match found
                }
            };
            return false; // No match found
        };

        // 🔹 Add a new user and encrypt the updated list
        public func addUser(user: User) : async Bool {
            if (await userExists(user.firstName, user.surName)) {
                return false; // Reject duplicate user
            };
            users.put(user.id, user);
            // Encrypt the updated list
            encryptUserList();

            return true;
          };

      // send all users 
        public query func getAllUsers() : async [(Text, User)] {
            return Iter.toArray(users.entries());
        };
    
    // 🔹 Update an existing user
        public func updateUser(user: User) : async Bool {
            switch (users.get(user.id)) {
                case (?_) {
                    users.put(user.id, user);
                    encryptUserList(); // Update encrypted list
                    return true;
                };
                case null {
                    return false;
                };
            }
        };

            
        // 🔹 Delete a user
        public func deleteUser(userId: Text) : async Bool {
            switch (users.remove(userId)) {
                case (?_) {
                    encryptUserList(); // Update encrypted list
                    return true;
                };
                case null {
                    return false;
                };
            }
        };

    /// Search for a user using a full name string
        public query func findUser(fullName: Text) : async ?User {
            let names = Text.split(fullName, #char ' ');
            let nameArray = Iter.toArray(names);

            if (nameArray.size() < 2) {
                return null; // Invalid input (no surname)
            };

            let lowerFirstName = toLowercase(nameArray[0]);
            let lowerSurName = toLowercase(nameArray[1]);

            for ((_, user) in users.entries()) {
                if (toLowercase(user.firstName) == lowerFirstName and 
                    toLowercase(user.surName) == lowerSurName) {
                    return ?user; // User found
                }
            };
            return null; // No match found
        };

       // Attendance

        func getDateOnly(timestamp: Text) : Text {
            
            switch (Text.split(timestamp, #char 'T').next()) {
                case (?dateOnly) {
                   
                    dateOnly
                };
                case null {
                    Debug.print("⚠️ Failed to extract date from timestamp: " # timestamp);
                    timestamp
                };
            }
        };

        // 🔹 Check if a user with the same name exists (case-insensitive)
        public query func memberExists(timestamp: Text, fullName: Text): async Bool {
                let date = getDateOnly(timestamp);
                let lowerFullName = toLowercase(fullName);
                switch (dailyAttendees.get(date)) {
                    case (?attendanceMap) {
                        for ((_, record) in attendanceMap.entries()) {
                            
                            if (toLowercase(record.name) == lowerFullName) {
                            
                                return true; // Match found for that date
                            };
                        };
                    };
                    case null {
                        Debug.print("📭 No attendance map yet for date: " # date);
                    };
                };
                return false; // No match found
        };

        // 🔹 Add a new attendance record
       public func addAttendance(record: Attendance): async Bool {
                let date = getDateOnly(record.createdAt);
                let lowerFullName = toLowercase(record.name);

                switch (dailyAttendees.get(date)) {
                    case (?attendanceMap) {
                        for ((_, existingRecord) in attendanceMap.entries()) {
                       
                            if (toLowercase(existingRecord.name) == lowerFullName) {
                                return false;
                            };
                        };
                       
                        attendanceMap.put(record.id, record);
                    };
                    case null {
                        
                        let newMap = HashMap.HashMap<Text, Attendance>(10, Text.equal, Text.hash);
                        newMap.put(record.id, record);
                        dailyAttendees.put(date, newMap); // ✅ FIXED: use only the date
                    };
                };

     
                return true;
        };

        // 🔹 Retrieve all attendance records across all dates
        public query func getAttendance(): async [(Text, Attendance)] {
            var allRecords: [(Text, Attendance)] = [];

            for ((date, attendanceMap) in dailyAttendees.entries()) {
             
                for ((id, record) in attendanceMap.entries()) {
                    allRecords := Array.append(allRecords, [(id, record)]);
                };
            };

       
            return allRecords;
        };

        public func deleteAttendance(timestamp: Text, id: Text): async Bool {
            let date = getDateOnly(timestamp);
          

            switch (dailyAttendees.get(date)) {
                case (?attendanceMap) {
                    switch (attendanceMap.remove(id)) {
                        case (?_) {
                          
                            return true;
                        };
                        case null {
                          
                            return false;
                        };
                    };
                };
                case null {
                   
                    return false;
                };
            };
        };

        // Authentication
        public shared func addUserInfo(p: Principal, r: Role): async Bool {
            // Directly add the principal and role to the userRoles map
                userRoles.put(p, { role = r; authenticated = true });
                return true;
            };

        public query func getRole(p: Principal): async ?Role {
            switch (userRoles.get(p)) {
                case (?info) { return ?info.role };
                case null { return null };
            }
        };

        public query func getAllRoles(): async [(Principal, UserInfo)] {
            return Iter.toArray(userRoles.entries());
        };

      
        public shared func deleteIdentity(p: Principal): async Bool {
            // Directly delete the identity from userRoles without role checking
            userRoles.delete(p);
            return true;
        };


            // Track returning first timers by comparing names
        public func trackReturningFirstTimers(today: Text) : async {
            present: [Attendance];
            absent: [Attendance];
            } {

            let firstTimersByName = HashMap.HashMap<Text, (Attendance, Nat, Text)>(10, Text.equal, Text.hash);
            // nameKey -> (Attendance, absentCount, lastSeenDate)

            // Step 1: Collect first timers from all previous days
            for ((date, map) in dailyAttendees.entries()) {
                if (date != today) {
                for ((_, attendee) in map.entries()) {
                    if (attendee.status == "First Timer") {
                    let nameKey = toLowercase(attendee.name);
                    switch (firstTimersByName.get(nameKey)) {
                        case null {
                        firstTimersByName.put(nameKey, (attendee, 0, date));
                        };
                        case (?(_, count, lastSeen)) {
                        // Keep the latest date
                        let newerDate = if (date > lastSeen) { date } else { lastSeen };
                        firstTimersByName.put(nameKey, (attendee, count, newerDate));
                        };
                    };
                    };
                };
                };
            };

            // Step 2: Compare with today’s attendees
            var present: [Attendance] = [];
            var absent: [Attendance] = [];

            switch (dailyAttendees.get(today)) {
                case (?todayMap) {
                for ((nameKey, (prevAttendee, absents, lastSeen)) in firstTimersByName.entries()) {
                    var foundToday = false;
                    for ((_, todayAttendee) in todayMap.entries()) {
                    if (toLowercase(todayAttendee.name) == nameKey) {
                        present := Array.append(present, [todayAttendee]);
                        foundToday := true;
                    };
                    };
                    if (not foundToday) {
                    absent := Array.append(absent, [prevAttendee]);
                    };
                };
                };
                case null {
                // No attendance recorded today
                for ((_, (prevAttendee, _, _)) in firstTimersByName.entries()) {
                    absent := Array.append(absent, [prevAttendee]);
                };
                };
            };

            return {
                present = present;
                absent = absent;
            };
        };
       // Returns the last attended date and total attendance count for a name
        public query func getAttendanceStatsByName(name: Text): async ?{
            lastAttended: Text;
            total: Nat;
        } {
            let nameKey = toLowercase(name);
            var lastDate: Text = "";
            var count: Nat = 0;

            for ((date, map) in dailyAttendees.entries()) {
                for ((_, attendee) in map.entries()) {
                    if (toLowercase(attendee.name) == nameKey) {
                        count += 1;
                        if (lastDate == "" or date > lastDate) {
                            lastDate := date;
                        };
                    };
                };
            };

            if (count == 0) {
                return null;
            } else {
                return ?{
                    lastAttended = lastDate;
                    total = count;
                };
            };
        };

        // All dates 
        // Returns a list of all attendance dates (sorted or unsorted)
            public query func getAllAttendanceDates() : async [Text] {
                var dates : [Text] = [];
                for ((date, _) in dailyAttendees.entries()) {
                    dates := Array.append(dates, [date]);
                };
                return dates;
            };

            // get all dates
            public query func getAttendanceByDate(date: Text): async [Attendance] {
                switch (dailyAttendees.get(date)) {
                    case (?map) {
                        Iter.toArray(map.vals());
                    };
                    case null { [] };
                }
            };

           public query func getMissedSinceLast(thresholdText: Text, referenceDate: Text): async [(Text, Nat, Text)] {
                let threshold = Nat.fromText(thresholdText);
                            switch (threshold) {
                    case null {
                        Debug.print("Invalid threshold value: " # thresholdText);
                        return [];
                    };
                    case (?threshold) {
                        // Continue with your current logic, using `threshold` as a Nat
                    };
                };
                let nameAttendance = HashMap.HashMap<Text, (Text, Nat)>(10, Text.equal, Text.hash); // name -> (lastAttended, totalPresent)

                // Step 1: Collect last attended dates and attendance count
                for ((date, map) in dailyAttendees.entries()) {
                    for ((_, attendee) in map.entries()) {
                        let nameKey = toLowercase(attendee.name);
                        switch (nameAttendance.get(nameKey)) {
                            case null {
                                nameAttendance.put(nameKey, (date, 1));
                            };
                            case (? (lastSeen, count)) {
                                let updatedLast = if (date > lastSeen) { date } else { lastSeen };
                                nameAttendance.put(nameKey, (updatedLast, count + 1));
                            };
                        };
                    };
                };

                // Step 2: Collect all dates and sort
                var dates: [Text] = Iter.toArray(dailyAttendees.keys());
                dates := Array.sort<Text>(dates, func(a, b) {
                    if (a < b) { #less }
                    else if (a == b) { #equal }
                    else { #greater }
                });

                // Step 3: Filter based on missed attendance between lastSeen and referenceDate
                var missed: [(Text, Nat, Text)] = [];

                for ((name, (lastSeen, _)) in nameAttendance.entries()) {
                    var missedCount: Nat = 0;

                    for (date in dates.vals()) {
                        if (date > lastSeen and date <= referenceDate) {
                            switch (dailyAttendees.get(date)) {
                                case (?map) {
                                    var found = false;
                                    for ((_, attendee) in map.entries()) {
                                        if (toLowercase(attendee.name) == name) {
                                            found := true;
                                        };
                                    };
                                    if (not found) {
                                        missedCount += 1;
                                    };
                                };
                                case null {};
                            };
                        };
                    };

            switch (threshold) {
                case (?t) {
                    if (missedCount == t) {
                    missed := Array.append(missed, [(name, missedCount, lastSeen)]);
                    };
                };
                case null {
                    // handle missing threshold if needed, or skip
                };
            };

                };

                return missed;
            }
            };

