import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, StatusBar, Platform } from 'react-native';
import { getDatabase, ref, update, get } from 'firebase/database';
import { Buttonproduk, Gap, PageHeaderAdmin, TextInputdua } from '../../components';
import app from '../../config/firebase';

const EditPoin = ({ route, navigation }) => {
  const { id } = route.params;

  const [nama, setNama] = useState('');
  const [gender, setGender] = useState('');
  const [seating, setSeating] = useState('');
  const [outsider, setOutsider] = useState('');
  const [poin, setPoin] = useState('');

  useEffect(() => {
    const db = getDatabase(app);
    const dataRef = ref(db, `StudentsPoinSabat/${id}`);
    get(dataRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setNama(data.nama);
        setGender(data.gender);
        setSeating(data.seating);
        setOutsider(data.outsider);
        setPoin(data.poin.toString());
      }
    });
  }, [id]);

  const handleUpdate = () => {
    if (!nama || !gender || !seating || !outsider || !poin) {
      Alert.alert('Error', 'Semua field wajib diisi.');
      return;
    }

    const db = getDatabase(app);
    update(ref(db, `StudentsPoinSabat/${id}`), {
      nama,
      gender,
      seating,
      outsider,
      poin: parseInt(poin),
    })
      .then(() => {
        Alert.alert('Sukses', 'Data berhasil diperbarui.');
        navigation.goBack();
      })
      .catch((err) => {
        Alert.alert('Gagal', err.message);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="#0A3832" />
      <PageHeaderAdmin />
      <Text style={styles.contenttext}>Edit Student</Text>
      <Gap height={44} />

      <TextInputdua label="Nama" value={nama} onChangeText={setNama} placeholder="Nama" />
      <TextInputdua label="Gender" value={gender} onChangeText={setGender} placeholder="Gender" />
      <TextInputdua label="Seating" value={seating} onChangeText={setSeating} placeholder="Seating" />
      <TextInputdua label="Outsider" value={outsider} onChangeText={setOutsider} placeholder="Outsider" />
      <TextInputdua
        label="Poin"
        value={poin}
        onChangeText={(val) => setPoin(val.replace(/[^0-9]/g, ''))}
        placeholder="Poin"
      />

      <Gap height={20} />
      <Buttonproduk label="Update" onPress={handleUpdate} backgroundColor="#0A3832" />
    </View>
  );
};

export default EditPoin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'white',
  },
   contenttext: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    marginLeft: 40,
    marginTop: 20,
},
});
