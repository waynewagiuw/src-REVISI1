import {StatusBar, StyleSheet, Text, Platform, View} from 'react-native';
import React, {useEffect} from 'react';
import Logo from '../../assets/icon/Eco';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832" />
      <Logo width={'20%'} height={'20%'} />
      <Text style={styles.text}>GreenPoin</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A3832',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

  },
  text: {
    fontSize: 32,
    color:'white',
    fontFamily: 'Poppins-Medium',
    marginTop:10
  },
});