import { StyleSheet, Text, View, TextInput as Input } from 'react-native';
import React from 'react';

const TextInput = ({ placeholder, value, onChangeText, secureTextEntry }) => {
  return (
    <View>
      <Input
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText} 
        secureTextEntry={secureTextEntry}  
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderBottomWidth: 2,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
    color: '#ABABAB',
  },
});
