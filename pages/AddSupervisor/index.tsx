import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform, Alert } from 'react-native';
import { Buttonproduk, Gap, PageHeaderAdmin, TextInputdua } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, push } from 'firebase/database';
import app from '../../config/firebase';

const AddSupervisor = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('admin'); // Default role

  const handleSubmit = () => {
    if (!username || !role) {
      Alert.alert('Error', 'Semua field wajib diisi.');
      return;
    }

    const data = {
      username,
      role,
      tanggal: new Date().toISOString(),
    };

    const db = getDatabase(app);
    push(ref(db, 'admins'), data)
      .then(() => {
        Alert.alert('Sukses', 'Admin berhasil ditambahkan.');
        navigation.goBack();
      })
      .catch((err) => {
        Alert.alert('Gagal', err.message);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="#0A3832" />
      <PageHeaderAdmin />
      <Text style={styles.header}>Tambah Admin</Text>
      <Gap height={46} />

      <TextInputdua
        label="Username :"
        placeholder="contoh: refly"
        value={username}
        onChangeText={setUsername}
        style={styles.inputdua}
      />

      <Text style={styles.label}>Role :</Text>
      <View style={styles.pickerWrapperSingle}>
        <Picker
          selectedValue={role}
          onValueChange={setRole}
          style={styles.pickerdua}
          dropdownIconColor="black"
        >
          <Picker.Item label="admin" value="admin" />
          <Picker.Item label="supervisor" value="supervisor" />
        </Picker>
      </View>
      <Gap height={24} />

      <Buttonproduk backgroundColor="#0A3832" label="Kirim" onPress={handleSubmit} />
      <Gap height={46} />
    </ScrollView>
  );
};

export default AddSupervisor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    marginLeft: 40,
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 45,
    marginTop: -20,
    marginBottom: 6,
  },
  inputdua: {
    width: '78%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    marginLeft: 40,
    marginBottom: 10,
    paddingLeft: 8,
  },
  pickerWrapperSingle: {
    width: '78%',
    height: 40,
    marginLeft: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  pickerdua: {
    height: 40,
    color: 'black',
    fontSize: 14,
    marginTop: -8,
    paddingHorizontal: 8,
  },
});
