const USER = "user";

export const getUser = () => {
  return JSON.parse(sessionStorage.getItem(USER) || localStorage.getItem(USER));
};

export const saveUser = (user, remember) => {
  if (remember) return localStorage.setItem(USER, JSON.stringify(user));
  sessionStorage.setItem(USER, JSON.stringify(user));
};

export const removeUser = () => {
  sessionStorage.removeItem(USER);
  localStorage.removeItem(USER);
};
