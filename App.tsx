import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router'; 
import { addAdminData } from './config/addAdminData'; 
import './config/firebase'; 

const App = () => {
  useEffect(() => {
    addAdminData('admin1', 'staffvdonly', 'admin');
  }, []);  

  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;
