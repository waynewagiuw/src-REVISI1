import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Gap from '../../atoms/Gap';

const Jenis = ({ poin, gp, isSelected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.jenis, isSelected && styles.selected]}>
        <Text style={styles.text}>{poin}</Text>
        <Text style={styles.textdua}>{gp}</Text>
        <Gap height={20} />
      </View>
    </TouchableOpacity>
  );
};

export default Jenis;

const styles = StyleSheet.create({
  jenis: {
    backgroundColor: '#D4E5F4',
    width: 70,
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  selected: {
    backgroundColor: 'white', 
  },
  text: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    marginTop:20
  },
  textdua: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: 'black',
    marginTop:-10
  },
});
