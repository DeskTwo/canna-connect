"use client";
import { useState } from "react";
import { registerUser, loginUser, getUserProfile } from "../lib/api";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const handleRegister = async () => {
    const result = await registerUser(email, password, role);
    console.log("Registered:", result);
  };

  const handleLogin = async () => {
    const result = await loginUser(email, password);
    console.log("Logged in:", result);
    if (result.access_token) setToken(result.access_token);
  };

  const fetchProfile = async () => {
    const profile = await getUserProfile(token);
    console.log("Profile:", profile);
    setUserInfo(profile);
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

      {token && (
        <>
          <p>Token: {token}</p>
          <button onClick={fetchProfile}>Profil abrufen</button>
          {userInfo && <pre>{JSON.stringify(userInfo, null, 2)}</pre>}
        </>
      )}
    </div>
  );
}
