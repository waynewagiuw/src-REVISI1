import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router';
import { addAdmins } from './config/addAdminData';
import './config/firebase'; // Ensure Firebase is initialized here

const App = () => {
  useEffect(() => {
    addAdmins(); // Add new admins when the app starts
  }, []);  

  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;