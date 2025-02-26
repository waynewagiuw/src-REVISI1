import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Gap from '../../atoms/Gap';

const Jenisdua = ({ image, isSelected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.jenis, isSelected && styles.selected]}>
        <Image source={image} style={styles.image} />
        <Gap height={20} />
      </View>
    </TouchableOpacity>
  );
};

export default Jenisdua;

const styles = StyleSheet.create({
  jenis: {
    backgroundColor: '#D4E5F4',
    width: 120,
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  selected: {
    backgroundColor: 'white', 
  },
  image:{
    width:'100%',
    height:'100%',
  }
});
