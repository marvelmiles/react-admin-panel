export const getCachedObj = (key = "user") => {
  let obj = localStorage.getItem(key);
  return obj ? JSON.parse(obj) : {};
};

export const storeCache = (data, key = "user") => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const deleteCache = (key = "user") => {
  localStorage.setItem(key, JSON.stringify(null));
};
