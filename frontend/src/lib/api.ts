

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("API URL:", API_URL);


export const registerUser = async (email: string, password: string, role: string) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });

  return response.json();
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  return response.json();
};

export const getUserProfile = async (token: string) => {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.json();
};
