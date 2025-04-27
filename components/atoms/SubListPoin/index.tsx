import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Gap from '../Gap'; // Jika digunakan, pastikan file ini tersedia

const SubListPoin = ({ name, gender, seating, outsider, points, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>
        Name          : <Text style={styles.textdua}>{name}</Text>
      </Text>
      <Text style={styles.text}>
        Gender        : <Text style={styles.textdua}>{gender}</Text>
      </Text>
      <Text style={styles.text}>
        Seating       : <Text style={styles.textdua}>{seating}</Text>
      </Text>
      <Text style={styles.text}>
        Outsider     : <Text style={styles.textdua}>{outsider}</Text>
      </Text>
      <Text style={styles.text}>
        Poin Sabat  : <Text style={styles.textdua}>{points}</Text>
      </Text>
    </TouchableOpacity>
  );
};

export default SubListPoin;

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
});
