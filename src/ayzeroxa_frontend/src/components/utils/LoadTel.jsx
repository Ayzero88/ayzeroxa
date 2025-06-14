import GetUserNumberTel from './GetUserNumberTel';

const LoadTel = async({report, setPre, setAbs, setHoldReport}) => {
       
        const present = {};
        const absent = {};
        const missed = {}

        if(report?.present){
            for (const item of report?.present || []) {
                try {
                    present[item.name] = await GetUserNumberTel({name: item.name, storageName: "members", storageId: "m"});
                } catch (err) {
                    present[item.name] = 'Unavailable';
                };
            };
        };
        if(report?.absent){

                for (const item of report?.absent || []) {
                    try {
                        absent[item.name] = await GetUserNumberTel({name: item.name, storageName: "members", storageId: "m"});
                    } catch (err) {
                        absent[item.name] = 'Unavailable';
                    };
                };

        };

        if(report?.length > 0 && !report?.present && !report?.absent){
        for (const item of report || []) {
            try {
                missed[item.name] = await GetUserNumberTel({name: item.name, storageName: "members", storageId: "m"});
            } catch (err) {
                missed[item.name] = 'Unavailable';
            };
        };
     };

        
        setPre(present || {});
        setAbs(absent || {});
        setHoldReport(report);
        return missed || {};
}

export default LoadTel;
