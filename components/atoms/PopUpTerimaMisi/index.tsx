import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Gap from '../Gap';
import { Buttonproduk } from '..';
import { useNavigation } from '@react-navigation/native';

const PopUpTerimaMisi = ({ title }) => {
    const navigation = useNavigation();
    const handleTidak = () => {
      navigation.navigate('MissionDetail');
    };
    const handleYa = () => {
      navigation.navigate('Submission');
    };
  return (
    <View style={styles.box}>
      <View style={styles.contentwrapper}>
        <View>
          <Text style={styles.header}>{title}</Text>
          <Gap height={20} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Buttonproduk
            label="Tidak"
            width="47%"
            backgroundColor="#0A3832"
            onPress={handleTidak} 
          />
          <Buttonproduk
            label="Ya"
            width="47%"
            backgroundColor="#135D66"
            onPress={handleYa} 
          />
        </View>
      </View>
    </View>
  );
};

export default PopUpTerimaMisi;

const styles = StyleSheet.create({
  header: {
    color: 'black',
    fontSize: 25,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  box: {
    marginHorizontal: 30,
    backgroundColor: 'white',
    borderRadius: 9,
  },
  contentwrapper: {
    marginVertical: 20,
    marginHorizontal: 14,
  },
  text: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  logo: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 5,
    borderWidth: 1,
    height: 50,
    backgroundColor: '#0A3832',
  },
  label: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'white',
  },
});
