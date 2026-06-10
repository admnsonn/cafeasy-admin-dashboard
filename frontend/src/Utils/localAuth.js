import dummyData from "../dummyData";

const STORAGE_KEY = "cafeasy_local_data";

const getData = () => {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData));
    return { ...dummyData };
  }

  try {
    return JSON.parse(stored);
  } catch (err) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData));
    return { ...dummyData };
  }
};

const saveData = (data) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
};

const getAdmins = () => {
  const data = getData();
  return data.admins?.result ?? [];
};

const findAdmin = (username, password) => {
  const admins = getAdmins();
  return admins.find(
    (admin) => admin.username === username && admin.password === password
  );
};

const isUsernameTaken = (username) => {
  const admins = getAdmins();
  return admins.some((admin) => admin.username === username);
};

const getAdminByUsername = (username) => {
  const admins = getAdmins();
  return admins.find((admin) => admin.username === username) || null;
};

const addAdmin = (newAdmin) => {
  const data = getData();
  const admin = {
    username: newAdmin.username,
    password: newAdmin.password,
    emailCafe: newAdmin.emailCafe || "",
    namaCafe: newAdmin.namaCafe || "",
    alamatCafe: newAdmin.alamatCafe || "",
    deskripsiCafe: newAdmin.deskripsiCafe || "",
    namaPemilikCafe: newAdmin.namaPemilikCafe || "",
    noHpCafe: newAdmin.noHpCafe || "",
    imageUrl: newAdmin.imageUrl || "/avatar.png",
  };

  data.admins.result.push(admin);
  saveData(data);
  return admin;
};

const updateAdminByUsername = (username, updates) => {
  const data = getData();
  const index = data.admins.result.findIndex(
    (admin) => admin.username === username
  );
  if (index === -1) {
    return null;
  }

  data.admins.result[index] = {
    ...data.admins.result[index],
    ...updates,
  };
  saveData(data);
  return data.admins.result[index];
};

export {
  getData,
  saveData,
  getAdmins,
  findAdmin,
  isUsernameTaken,
  getAdminByUsername,
  addAdmin,
  updateAdminByUsername,
};
