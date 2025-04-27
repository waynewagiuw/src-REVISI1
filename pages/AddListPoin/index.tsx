import { View, Text, StyleSheet, StatusBar, Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import { Buttonproduk, Gap, PageHeaderAdmin, TextInputdua, TextInputtiga } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, push } from 'firebase/database';
import app from '../../config/firebase';

const AddListPoin = ({ navigation }) => {
  const [nama, setNama] = useState('');
  const [gender, setGender] = useState('Male'); 
  const [gedung, setGedung] = useState('PC');
  const [baris, setBaris] = useState('');
  const [kolom, setKolom] = useState('');
  const [outsider, setOutsider] = useState('Dekat');
  const [poin, setPoin] = useState('');

  const handleNumericInput = (setter) => (value) => {
    // Allow only numeric input
    const numericValue = value.replace(/[^0-9]/g, '');
    setter(numericValue);
  };

  const handleSubmit = () => {
    if (!nama || !gender || !baris || !kolom || !poin) {
      Alert.alert('Error', 'Semua field wajib diisi.');
      return;
    }

    // Check if baris, kolom, and poin are integers greater than 0
    if (parseInt(baris) <= 0 || parseInt(kolom) <= 0 || parseInt(poin) <= 0) {
      Alert.alert('Error', 'Baris, Kolom, dan Poin harus berupa angka integer lebih dari 0.');
      return;
    }

    const seating = `${gedung}-${baris}-${kolom}`;
    const data = {
      nama,
      gender,
      seating,
      outsider,
      poin: parseInt(poin),
      tanggal: new Date().toISOString(),
    };

    const db = getDatabase(app);
    push(ref(db, 'StudentsPoinSabat'), data)
      .then(() => {
        Alert.alert('Sukses', 'Data berhasil ditambahkan.');
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
      <Text style={styles.header}>Tambah Student</Text>
      <Gap height={46} />

      <TextInputdua
        label="Nama :"
        placeholder="contoh: Lastname, Firstname"
        value={nama}
        onChangeText={setNama}
        style={styles.inputdua}
      />

      <Text style={styles.label}>Gender :</Text>
      <View style={styles.pickerWrapperSingle}>
        <Picker
          selectedValue={gender}
          onValueChange={setGender}
          style={styles.pickerdua}
          dropdownIconColor="black"
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
      <Gap height={24} />

      <Text style={styles.label}>Seating :</Text>
      <View style={styles.row}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={gedung}
            onValueChange={setGedung}
            style={styles.picker}
            dropdownIconColor="black"
          >
            {['PC', 'FWC', 'UA', 'UIC'].map((item) => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          </Picker>
        </View>
        <Gap height={10} />

        <TextInputtiga
          placeholder="0"
          keyboardType="numeric"
          value={baris}
          onChangeText={handleNumericInput(setBaris)} // Use the numeric input handler
        />
        <TextInputtiga
          placeholder="0"
          keyboardType="numeric"
          value={kolom}
          onChangeText={handleNumericInput(setKolom)} // Use the numeric input handler
        />
      </View>

      <Text style={styles.label}>Outsider :</Text>
      <View style={styles.pickerWrapperSingle}>
        <Picker
          selectedValue={outsider}
          onValueChange={setOutsider}
          style={styles.pickerdua}
          dropdownIconColor="black"
        >
          <Picker.Item label="Dekat" value="Dekat" />
          <Picker.Item label="Jauh" value="Jauh" />
        </Picker>
      </View>
      <Gap height={24} />

      <TextInputdua
        label="Poin :"
        placeholder="contoh: 1"
        keyboardType="numeric"
        value={poin}
        onChangeText={handleNumericInput(setPoin)} // Use the numeric input handler
        style={styles.inputdua}
      />

      <Gap height={20} />
      <Buttonproduk backgroundColor="#0A3832" label="Kirim" onPress={handleSubmit} />
      <Gap height={46} />
    </ScrollView>
  );
};

export default AddListPoin;

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
  row: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginLeft: 40,
    alignItems: 'center',
  },
  pickerWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    height: 40,
    marginTop: -30,
    justifyContent: 'center',
    overflow: 'hidden',
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
  picker: {
    height: 40,
    color: 'black',
    fontSize: 14,
    paddingHorizontal: 8,
  },
  pickerdua: {
    height: 40,
    color: 'black',
    fontSize: 14,
    marginTop: -8,
    paddingHorizontal: 8,
  },
});