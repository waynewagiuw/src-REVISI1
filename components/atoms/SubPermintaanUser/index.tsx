import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Gap from '../Gap';
import { Buttonprodukreq } from '..';
import { getDatabase, ref, set, update, get, remove } from 'firebase/database';

const SubPermintaanUser = ({ name, date, points, gp, uid, dateKey, onHandled }) => {
  const truncateName = (name) => {
    if (!name) return '';
    return name.length > 15 ? name.substring(0, 15) + '...' : name;
  };

  const truncateDate = (date) => {
    if (!date) return '';
    return date.length > 19 ? date.substring(0, 19) : date;
  };

  const handleTerima = async () => {
    try {
      const db = getDatabase();
      const userRef = ref(db, `users/${uid}`);
      const trxRef = ref(db, `Transactions/${uid}/${dateKey}`);
  
      const userSnap = await get(userRef);
      if (!userSnap.exists()) return;
  
      const userData = userSnap.val();
      const currentSabat = userData.sabatpoints || 0;
      const currentVouchers = userData.vouchers || 0;
  
      // Tambahkan ke sabatpoints dan vouchers
      await update(userRef, {
        sabatpoints: currentSabat + points,
        vouchers: currentVouchers + points,
      });
  
      // Simpan transaksi
      await set(trxRef, {
        points: points,
        gp: gp,
        timestamp: new Date().toISOString(),
      });
  
      // Hapus permintaan
      await remove(ref(db, `request/${uid}/${dateKey}`));
  
      if (onHandled) onHandled();
    } catch (err) {
      console.error('Gagal terima:', err);
    }
  };
  

  const handleTolak = async () => {
    try {
      const db = getDatabase();
      const userRef = ref(db, `users/${uid}`);

      const userSnap = await get(userRef);
      if (!userSnap.exists()) return;

      const userData = userSnap.val();
      const currentGP = userData.userpoints || 0;

      // Kembalikan GP
      await update(userRef, {
        userpoints: currentGP + gp,
      });

      // Hapus request
      await remove(ref(db, `request/${uid}/${dateKey}`));

      if (onHandled) onHandled();
    } catch (err) {
      console.error('Gagal tolak:', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.text}>
          Nama      : <Text style={styles.textdua}>{truncateName(name)}</Text>
        </Text>
        <Text style={styles.text}>
          Tanggal   : <Text style={styles.textdua}>{truncateDate(date)}</Text>
        </Text>
        <Text style={styles.text}>
          Poin         : <Text style={styles.textdua}>{points}</Text>
        </Text>
      </View>
      <View style={styles.button}>
        <Buttonprodukreq label="✓" backgroundColor="#135D66" onPress={handleTerima} />
        <Gap height={16} />
        <Buttonprodukreq label="X" backgroundColor="#D00F0F" onPress={handleTolak} />
      </View>
    </View>
  );
};

export default SubPermintaanUser;

const styles = StyleSheet.create({
  container: {
    width: '85%',
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
  },
  left: {
    flex: 1,
  },
  button: {
    justifyContent: 'center',
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
});
