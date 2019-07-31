export const getAccessToken = () => localStorage.getItem("access_token");
export const setAccessToken = access_token =>
  localStorage.setItem("access_token", access_token);
export const removeAccessToken = () => localStorage.removeItem("access_token");
