const TOKEN = "token";

export const getToken = () => {
  return sessionStorage.getItem(TOKEN) || localStorage.getItem(TOKEN);
};

export const saveToken = (token, remember) => {
  if (remember) return localStorage.setItem(TOKEN, token);
  sessionStorage.setItem(TOKEN, token);
};

export const removeToken = () => {
  sessionStorage.removeItem(TOKEN);
  localStorage.removeItem(TOKEN);
};
