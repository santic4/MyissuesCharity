import { VITE_API_URL } from "../config/config.js";

export const fetchCampaigns = async () => {
  try {
    const res = await fetch(`${VITE_API_URL}/api/campaign`);
    if (!res.ok) throw new Error("Failed to fetch campaigns");
    return await res.json();
  } catch (error) {
    throw new Error(`Error fetching campaigns: ${error.message}`);
  }
};

export const fetchCampaign = async (id) => {
  try {
    const res = await fetch(`${VITE_API_URL}/api/campaign/${id}`);
    if (!res.ok) throw new Error("Failed to fetch campaign");
    return await res.json();
  } catch (error) {
    throw new Error(`Error fetching campaign: ${error.message}`);
  }
};

export const postDonation = async (campaignId, amount, method) => {
  try {
    const res = await fetch(`${VITE_API_URL}/api/donation`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ campaignId, amount, method }),
    });
    if (!res.ok) throw new Error("Failed to post donation");
    return await res.json();
  } catch (error) {
    throw new Error(`Error posting donation: ${error.message}`);
  }
};

export const fetchDonations = async () => {
  const res = await fetch(`${VITE_API_URL}/api/donation/all`,{
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
  });
  if (!res.ok) throw new Error('Failed to fetch donations');
  return res.json();
};

export const signupUser = async (data) => {
  try {
    const res = await fetch(`${VITE_API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to sign up");
    return await res.json();
  } catch (error) {
    throw new Error(`Error signing up: ${error.message}`);
  }
};

export const loginUser = async (creds) => {
  try {
    const res = await fetch(`${VITE_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creds)
    });
    if (!res.ok) throw new Error("Failed to login as user");
    return await res.json();
  } catch (error) {
    throw new Error(`Error logging in as user: ${error.message}`);
  }
};

export const loginAdmin = async (creds) => {
  try {
    const res = await fetch(`${VITE_API_URL}/api/auth/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creds)
    });
    if (!res.ok) throw new Error("Failed to login as admin");
    return await res.json();
  } catch (error) {
    throw new Error(`Error logging in as admin: ${error.message}`);
  }
};

export const fetchProfile = async () => {
  try {
    const res = await fetch(`${VITE_API_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!res.ok) throw new Error("Failed to fetch profile");
    return await res.json();
  } catch (error) {
    throw new Error(`Error fetching profile: ${error.message}`);
  }
};

export const fetchAdminStats = async () => {
  try {
    const res = await fetch(`${VITE_API_URL}/api/admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!res.ok) throw new Error("Failed to fetch admin stats");
    return await res.json();
  } catch (error) {
    throw new Error(`Error fetching admin stats: ${error.message}`);
  }
};
