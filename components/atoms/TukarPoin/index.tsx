import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Buttonproduk } from '..';
import { Jenis } from '../../molecules';
import Gap from '../Gap';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const TukarPoin = () => {
  const [selectedJenis, setSelectedJenis] = useState(null);
  const [userPoints, setUserPoints] = useState(0); // Current userpoints
  const [vouchers, setVouchers] = useState(0); // Current vouchers
  const navigation = useNavigation();

  // Fetch userpoints and vouchers from Firebase
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);

      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUserPoints(userData.userpoints || 0); // Set userpoints
          setVouchers(userData.vouchers || 0); // Set vouchers
        }
      });
    }
  }, []);

  // Data for the types of exchanges
  const jenisData = [
    { id: 1, poin: 2, gp: 4 },
    { id: 2, poin: 4, gp: 8 },
    { id: 3, poin: 6, gp: 12 },
  ];

  // Handle selection of a type
  const handlePress = (index) => {
    setSelectedJenis(index);
  };

  // Handle the "Tukar" button press
  const handleTukar = () => {
    if (selectedJenis === null) {
      alert('Pilih jenis terlebih dahulu!');
      return;
    }
  
    const selectedItem = jenisData.find((item) => item.id === selectedJenis);
  
    if (!selectedItem) {
      alert('Jenis tidak valid!');
      return;
    }
  
    const { poin, gp } = selectedItem;
  
    if (userPoints < gp) {
      alert('Poin tidak cukup untuk menukar!');
      return;
    }
  
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      const transactionRef = ref(db, `Transactions/${user.uid}`);
  
      // Get the current date and time
      const currentDate = new Date().toISOString(); // e.g., "2025-02-26T03:55:04.327Z"
      const sanitizedDate = currentDate.replace(/[.#$/[\]]/g, '_'); // Replace invalid characters
  
      // Update userpoints and vouchers in Firebase
      update(userRef, {
        userpoints: userPoints - gp, // Deduct gp from userpoints
        vouchers: vouchers + poin,  // Add poin to vouchers
      })
        .then(() => {
          // Save the transaction details
          const transactionData = {
            gp: -gp, // Negative because GP is deducted
            points: poin, // Points added
          };
  
          update(transactionRef, {
            [sanitizedDate]: transactionData, // Use sanitized date as the key
          })
            .then(() => {
              console.log('Transaction saved successfully.');
              navigation.navigate('DanaSukses'); // Navigate to success screen
            })
            .catch((error) => {
              console.error('Error saving transaction:', error);
              alert('Terjadi kesalahan saat menyimpan transaksi.');
            });
        })
        .catch((error) => {
          console.error('Error updating data:', error);
          alert('Terjadi kesalahan saat menukar poin.');
        });
    }
  };

  return (
    <View style={styles.tukar}>
      <View style={styles.contentwrapper}>
        <View style={styles.middana}>
          {jenisData.map((item) => (
            <Jenis
              key={item.id}
              poin={item.poin}
              gp={item.gp + " GP"}
              isSelected={selectedJenis === item.id}
              onPress={() => handlePress(item.id)}
            />
          ))}
        </View>
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
  contentwrapper: {
    marginVertical: 35,
    marginHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middana: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
    marginTop: -10,
  },
  tukar: {
    marginHorizontal: 24,
    marginTop: 5,
    backgroundColor: '#0A3832',
    borderRadius: 7,
  },
});