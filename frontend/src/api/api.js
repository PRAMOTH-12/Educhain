import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || '', // empty => you can call relative endpoints in production
  timeout: 10000,
});

export async function postRequest(path, payload) {
  if (!apiClient.defaults.baseURL) {
    // fallback: store in localStorage
    const key = 'employer_requests';
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    const item = { id: Date.now(), ...payload };
    arr.unshift(item);
    localStorage.setItem(key, JSON.stringify(arr));
    return { data: item };
  }
  const res = await apiClient.post(path, payload);
  return res;
}

export async function getRequests() {
  if (!apiClient.defaults.baseURL) {
    return JSON.parse(localStorage.getItem('employer_requests') || '[]');
  }
  const res = await apiClient.get('/requests');
  return res.data;
}
