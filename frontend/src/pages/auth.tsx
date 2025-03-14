"use client";
import { useState } from "react";
import { registerUser, loginUser, getUserProfile, logoutUser } from "../lib/api";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [userInfo, setUserInfo] = useState(null);

  const handleRegister = async () => {
    const result = await registerUser(email, password, role);
    
  };

  const handleLogin = async () => {
    const result = await loginUser(email, password);
    
    fetchProfile(); // 🚀 Hier sicherstellen, dass es nach Login ausgeführt wird
  };
  
  

  const handleLogout = async () => { // 🟢 Logout-Funktion
    const result = await logoutUser();
    
    setUserInfo(null);
  };

  const fetchProfile = async () => {
    console.log("🔍 fetchProfile() wurde aufgerufen!"); // 🟢 Debugging
    const profile = await getUserProfile();
    console.log("📡 Profile API Response:", profile);
  
    if (profile && profile.email) {
      setUserInfo(profile);
      console.log("✅ userInfo gesetzt:", profile);
    } else {
      console.warn("⚠️ Kein User-Profil erhalten!");
    }
  };
  
  
  
  
  

  return (
    <div style={{ padding: 20 }}>
      <h1>Login & Registrierung</h1>

      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="PATIENT">Patient</option>
        <option value="DOCTOR">Doctor</option>
        <option value="ADMIN">Admin</option>
      </select>

      <button onClick={handleRegister}>Registrieren</button>
      <button onClick={handleLogin}>Einloggen</button>

      {userInfo && (
        <>
          <button onClick={handleLogout}>Logout</button> {/* 🟢 Logout-Button */}
          <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        </>
      )}
    </div>
  );
}
