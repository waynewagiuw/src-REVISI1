import { StyleSheet, Text, View, TextInput as Input } from 'react-native';
import React from 'react';
import { Gap } from '../../atoms';

const TextInputdua = ({ label, placeholder, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.contentwrapper}>
        <Input
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#C0C0C0" 
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <Gap height={26} />
    </View>
  );
};

export default TextInputdua;

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    padding: 4,
    color: 'black',
  },
  container: {
    marginHorizontal: 24,
    marginTop: -20,
  },
  contentwrapper: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 7,
  },
  label: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
});
