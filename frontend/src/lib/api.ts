const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("API URL:", API_URL);

export const registerUser = async (email: string, password: string, role: string) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
    credentials: 'include', // 🟢 Cookies senden
  });

  return response.json();
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include", // ❗ Cookies senden
  });

  return response.json();
};

export const getUserProfile = async () => {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json(); // 🟢 Speichere das JSON-Ergebnis
  
  return data; // 🟢 Rückgabe der gespeicherten Daten
};










export const logoutUser = async () => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include', // 🟢 Damit das Cookie mitgeschickt wird
  });
  return response.json();
};

