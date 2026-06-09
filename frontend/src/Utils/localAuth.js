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

const getAdminById = (idAdmin) => {
  const admins = getAdmins();
  return admins.find((admin) => String(admin.idAdmin) === String(idAdmin)) || null;
};

const addAdmin = (newAdmin) => {
  const data = getData();
  const nextId = data.admins.result.reduce(
    (maxId, admin) => Math.max(maxId, admin.idAdmin),
    0
  ) + 1;
  const admin = {
    idAdmin: nextId,
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

const updateAdmin = (idAdmin, updates) => {
  const data = getData();
  const index = data.admins.result.findIndex(
    (admin) => String(admin.idAdmin) === String(idAdmin)
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
  getAdminById,
  addAdmin,
  updateAdmin,
};
