import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

const index = ({
  label,
  onPress,
  backgroundColor = '#0472D7',
  textColor = 'white',
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor}]}
      onPress={onPress}
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default index;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    height: 40,
    width: 40,
    alignSelf: 'center',
  },
  label: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
});
