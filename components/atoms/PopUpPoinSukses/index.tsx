import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Gap from '../Gap';

const PopUpPoinSukses = ({  label, label1, logo: LogoComponent, onPress }) => {
  return (
    <View style={styles.box}>
      <View style={styles.contentwrapper}>
        <View>
          <Text style={styles.header}>{label}</Text>
          <LogoComponent style={styles.logo} />
          <Text style={styles.text}>{label1}</Text>
          <Gap height={20} />
        </View>
        <TouchableOpacity
          style={[styles.button]}
          onPress={onPress}>
          <Text style={styles.label}>Kembali</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PopUpPoinSukses;

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
    backgroundColor:'#0A3832'
  },
  label: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'white',
  },
});
