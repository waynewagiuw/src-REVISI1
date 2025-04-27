import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import DeleteIcon from '../../../assets/icon/delete.png'; // Ensure this path is correct

const SubListStaf = ({ name, role, onPress, onDelete }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>
          Username  : <Text style={styles.textdua}>{name}</Text>
        </Text>
        <Text style={styles.text}>
          Role            : <Text style={styles.textdua}>{role}</Text>
        </Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Image source={DeleteIcon} style={styles.deleteIcon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SubListStaf;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 15,
    elevation: 7,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: 'black',
    marginBottom: 5,
    fontFamily: 'Poppins-Light',
  },
  textdua: {
    fontSize: 15,
    color: 'black',
    marginBottom: 5,
    fontFamily: 'Poppins-Bold',
  },
  deleteIcon: {
    width: 24,
    height: 24,
  },
});
