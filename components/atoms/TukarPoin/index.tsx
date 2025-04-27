import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, get, update, set ,  remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Jenis } from '../../molecules';
import { Buttonproduk } from '..';
import Gap from '../Gap';

const TukarPoin = () => {
  const [selectedJenis, setSelectedJenis] = useState(null);
  const [userPoints, setUserPoints] = useState(0);
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();

  // Ambil poin user saat mount
  useEffect(() => {
    if (!user) return;
    const userRef = ref(db, `users/${user.uid}`);
    get(userRef)
      .then(snap => {
        if (snap.exists()) {
          const d = snap.val();
          setUserPoints(d.userpoints || 0);
        }
      })
      .catch(err => console.error('Fetch user error:', err));
  }, [user, db]);

  const jenisData = [
    { id: 1, poin: 2, gp: 4 },
    { id: 2, poin: 4, gp: 8 },
    { id: 3, poin: 6, gp: 12 },
  ];

  const handlePress = (id) => setSelectedJenis(id);

  const handleTukar = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user || selectedJenis === null) {
      Alert.alert('Gagal', 'Silakan pilih jenis penukaran terlebih dahulu.');
      return;
    }
  
    const db = getDatabase();
    const uid = user.uid;
    const userRef = ref(db, `users/${uid}`);
    const jenis = jenisData.find(j => j.id === selectedJenis);
  
    if (!jenis) {
      Alert.alert('Gagal', 'Jenis penukaran tidak valid.');
      return;
    }
  
    const { gp, poin } = jenis;
    const timestamp = Date.now().toString(); // Aman untuk Firebase key
    const requestRef = ref(db, `request/${uid}/${timestamp}`);
  
    try {
      const snap = await get(userRef);
      if (!snap.exists()) {
        Alert.alert('Gagal', 'Data pengguna tidak ditemukan.');
        return;
      }
  
      const data = snap.val();
      const currentGP = data.userpoints || 0;
  
      // 💥 Jika GP tidak cukup
      if (currentGP < gp) {
        Alert.alert('Poin Tidak Cukup', `Kamu butuh ${gp} GP, tapi hanya punya ${currentGP} GP.`);
        return;
      }
  
      // Kurangi GP user sementara
      await update(userRef, {
        userpoints: currentGP - gp,
      });
  
      // Kirim request ke Firebase
      await set(requestRef, {
        username: data.username || 'User',
        gp,
        points: poin,
        timestamp: new Date().toISOString(), // ISO tetap dipakai di dalam data
      });
  
      Alert.alert('Sukses', 'Permintaan penukaran berhasil dikirim!');
    } catch (error) {
      console.error('Gagal menukar poin:', error);
      Alert.alert('Error', 'Terjadi kesalahan saat memproses penukaran.');
    }
  };
  
  return (
    <View style={styles.tukar}>
      <View style={styles.contentwrapper}>
        <View style={styles.middana}>
          {jenisData.map(item => (
            <Jenis
              key={item.id}
              poin={item.poin}
              gp={`${item.gp} GP`}
              isSelected={selectedJenis === item.id}
              onPress={() => handlePress(item.id)}
            />
          ))}
        </View>
        <Gap height={16} />
        <Buttonproduk
          width="100%"
          label="Tukar"
          onPress={handleTukar}
          backgroundColor="#0A3832"
        />
      </View>
    </View>
  );
};

export default TukarPoin;

const styles = StyleSheet.create({
  tukar: {
    marginHorizontal: 24,
    marginTop: 5,
    backgroundColor: '#0A3832',
    borderRadius: 7,
    padding: 16,
  },
  contentwrapper: {
    backgroundColor: '#0A3832',
    borderRadius: 8,
    padding: 16,
  },
  middana: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
