import { getDatabase, ref, set } from "firebase/database";  
import { db } from '../firebase';

const addAdminData = (adminId, username, role) => {
  const adminRef = ref(db, 'admins/' + adminId); 
  set(adminRef, {
    uid: adminId,
    username: username,
    role: role
  })
  .then(() => {
    console.log("Admin data added successfully");
  })
  .catch((error) => {
    console.error("Error adding admin data: ", error);
  });
};

export { addAdminData };
