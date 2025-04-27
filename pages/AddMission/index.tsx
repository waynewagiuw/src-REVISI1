import { View, Text, StyleSheet, StatusBar, Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import { Buttonproduk, Gap, PageHeaderAdmin, TextInputdua, Uploadpicture } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, serverTimestamp } from 'firebase/database';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddMission = ({ route, navigation }) => {
  const { onNewMission } = route.params;
  const [task, setTask] = useState('');
  const [selectedTime, setSelectedTime] = useState('15');
  const [points, setPoints] = useState('1');
  const [quota, setQuota] = useState('');
  const [description, setDescription] = useState('');
  const [imageSource, setImageSource] = useState(null);
  const [availableUntil, setAvailableUntil] = useState('');
  const [supervisor, setSupervisor] = useState('');

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const timeOptions = [
    { label: '15 minutes', value: '15', points: 1 },
    { label: '30 minutes', value: '30', points: 2 },
    { label: '45 minutes', value: '45', points: 3 },
    { label: '60 minutes', value: '60', points: 4 },
  ];

  const handleTimeChange = (value) => {
    setSelectedTime(value);
    const selectedTimeOption = timeOptions.find((option) => option.value === value);
    setPoints(selectedTimeOption.points.toString());
  };

  const validateAndSubmit = () => {
    if (!task.trim()) {
      Alert.alert('Error', 'Tugas tidak boleh kosong!');
      return;
    }

    if (!quota.trim() || isNaN(quota)) {
      Alert.alert('Error', 'Masukkan angka untuk kuota!');
      return;
    }

    if (!availableUntil.trim()) {
      Alert.alert('Error', 'Waktu tidak boleh kosong!');
      return;
    }

    if (!supervisor.trim()) {
      Alert.alert('Error', 'Nama supervisor tidak boleh kosong!');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'Deskripsi tidak boleh kosong!');
      return;
    }

    const missionData = {
      imageSource,
      task,
      time: selectedTime,
      points,
      status: '0',
      quota: parseInt(quota, 10),
      description,
      postedAt: serverTimestamp(),
      availableUntil: availableUntil.trim(),
      supervisor,
    };

    onNewMission(missionData);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#0A3832" />
      <PageHeaderAdmin />
      <Text style={styles.header}>Tambah Misi</Text>
      <Gap height={46} />

      <TextInputdua label="Tugas :" placeholder="contoh: Membersihkan halaman" value={task} onChangeText={setTask} style={styles.input} />

      <Text style={styles.labeldua}>Waktu tugas :</Text>

      <View style={styles.inputdua}>
        <Picker selectedValue={selectedTime} style={styles.picker} onValueChange={handleTimeChange}>
          {timeOptions.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>

      <TextInputdua label="Poin :" value={points} editable={false} style={styles.input} />

      <TextInputdua
        label="Kuota orang :"
        placeholder="contoh: 1 (maks 10)"
        value={quota}
        onChangeText={(text) => setQuota(text.replace(/[^0-9]/g, ''))}
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInputdua label="Deskripsi :" placeholder="contoh: Bersihkan Halaman ini" value={description} onChangeText={setDescription} style={styles.input} multiline={true} numberOfLines={4} />

      <Text style={styles.labeldua}>Berlaku sampai :</Text>
      <View style={styles.timePickerWrapper}>
        <Buttonproduk
          backgroundColor="#FFFFFF"
          label={availableUntil ? `Pilih waktu: ${availableUntil}` : 'Pilih waktu'}
          onPress={() => setShowTimePicker(true)}
          textColor="black"
        />
      </View>

      <Gap height={10} />

      {showTimePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          display="spinner"
          onChange={(event, date) => {
            setShowTimePicker(false);
            if (date) {
              setSelectedDate(date);
              const formattedTime = date.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              });
              setAvailableUntil(formattedTime);
            }
          }}
        />
      )}
      <Gap height={24} />

      <TextInputdua label="Supervisor :" placeholder="Masukkan nama supervisor" value={supervisor} onChangeText={setSupervisor} style={styles.input} />

      <Uploadpicture label="Foto tempat : (optional)" pic={imageSource} onImagePicked={(uri) => setImageSource(uri)} />

      <Buttonproduk backgroundColor="#0A3832" label="Kirim" onPress={validateAndSubmit} />
      <Gap height={46} />
    </ScrollView>
  );
};

export default AddMission;

const styles = StyleSheet.create({
  input: { width: '100%', height: 40, borderWidth: 1, marginBottom: 10, paddingLeft: 8 },
  inputdua: { width: '78%', height: 40, borderWidth: 1, marginBottom: 40, marginLeft: 40, paddingLeft: 6, borderRadius: 4 },
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, backgroundColor: 'white',  },
  header: { fontSize: 18, fontWeight: 'bold', color: 'black', marginLeft: 40, marginTop: 20 },
  labeldua: { marginLeft: 43, fontSize: 14, marginTop: -15, fontWeight: 'bold', marginBottom: 10, color: 'black' },
  picker: { color: 'black', fontSize: 12, marginLeft: -15, marginTop: -8 },
  timePickerWrapper: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginHorizontal: 40,
    height: 45,
    marginBottom: 10,
    overflow: 'hidden',
  },

});
