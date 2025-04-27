import { getDatabase, ref, set } from "firebase/database";  
import { getAuth } from "firebase/auth"; 
import { db } from '../firebase';

const addAdminData = (adminId, username, role) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
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
  } else {
    console.error("User is not authenticated");
  }
};

const addAdmins = () => {
  addAdminData('admin2', 'omrefly', 'supervisor');

};

export { addAdmins };