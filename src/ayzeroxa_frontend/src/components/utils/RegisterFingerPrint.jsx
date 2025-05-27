import { startRegistration } from "@simplewebauthn/browser";
import React, { useState } from "react";
import Buttons from "./Buttons";
import { FaFingerprint } from "react-icons/fa";

export default function RegisterFingerprint({ onRegister }) {
  const [status, setStatus] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const registerUser = async () => {
    setIsScanning(true);
    setStatus("Requesting fingerprint scan...");

    try {
      // Fetch registration options from the server
      const response = await fetch("/api/generate-registration-options");
      const options = await response.json();

      setStatus("Place your finger on the scanner...");

      // Start fingerprint registration
      const attestationResponse = await startRegistration(options);

      console.log("✅ Fingerprint Registered:", attestationResponse);

      // Send the attestation response to the server for verification
      const verificationResponse = await fetch("/api/verify-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attestationResponse),
      });

      if (verificationResponse.ok) {
        setStatus("Registered successfully!");
        onRegister(attestationResponse);
      } else {
        setStatus("Registration verification failed. Try again.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      setStatus("Fingerprint scan failed. Try again.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div>
      <Buttons
        txt={isScanning ? "Scanning..." : "Scan"}
        onclick={registerUser}
        disabled={isScanning}
        icon={<FaFingerprint />}
        wt="10rem"
      />
      <p>{status}</p>
    </div>
  );
}
