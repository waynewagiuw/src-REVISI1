import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Logo from '../../../assets/icon/Eco';
import User from '../../../assets/icon/userset.svg';
import Notif from '../../../assets/icon/bel.svg';
import Poin from '../../../assets/icon/paper.svg';
import { useNavigation } from '@react-navigation/native';

const PageHeaderAdminDua = () => {
  const navigation = useNavigation();
  const handleUserPress = () => {
    // Navigasi langsung tanpa input username
    navigation.navigate('ListStaf');
  };
  const handlePoinPress = () => {
    // Navigasi langsung tanpa input username
    navigation.navigate('ListPoin');
  };

  const handleNotifPress = () => {
    // Navigasi langsung tanpa input username
    navigation.navigate('PermintaanUser');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo width={40} height={40} marginTop={15} />
        <Text style={styles.Hello}>GreenPoin</Text>
        <TouchableOpacity onPress={handleUserPress}>
          <User width={35} height={35} style={styles.userIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePoinPress}>
          <Poin width={30} height={30} style={styles.poinIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNotifPress}>
          <Notif width={30} height={30} style={styles.notifIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PageHeaderAdminDua;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A3832',
    paddingLeft: 24,
    height: 85,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  Hello: {
    fontSize: 20,
    marginTop: 20,
    marginLeft: 8,
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
  notifIcon: {
    marginLeft: -10,
    marginTop: 20,
  },
   poinIcon: {
    marginLeft: 20,
    marginRight: 24,
    marginTop: 20,
  },
  userIcon: {
    marginTop: 20,
    marginLeft: 40,

  },
});
