import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, ScrollView, Text } from 'react-native';
import { PageHeaderAdmin, SubPermintaanUser } from '../../components';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const PermintaanUser = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const requestRef = ref(db, 'request');
  
    onValue(requestRef, (snapshot) => {
      if (snapshot.exists()) {
        const allRequests = snapshot.val();
        const requestList = [];
  
        Object.entries(allRequests).forEach(([uid, requests]) => {
          Object.entries(requests).forEach(([dateKey, value]) => {
            requestList.push({
              uid,
              dateKey,
              date: value.timestamp,
              points: value.points,
              gp: value.gp,
              name: value.username,
            });
          });
        });
  
        // Urutkan berdasarkan waktu terbaru
        requestList.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTransactions(requestList);
      } else {
        setTransactions([]);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#0A3832" />
      <PageHeaderAdmin title="Permintaan User" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentWrapper}>
          <Text style={styles.contenttext}>Permintaan</Text>

          {transactions.map((trx, index) => (
            <SubPermintaanUser
              key={index} // Ganti key dengan index jika ingin menggunakan index sebagai key
              name={trx.name} // gunakan trx.name, bukan item.username
              date={trx.date} // gunakan trx.date, bukan item.timestamp
              points={trx.points} // gunakan trx.points
              gp={trx.gp} // gunakan trx.gp
              uid={trx.uid} // gunakan trx.uid
              dateKey={trx.dateKey} // gunakan trx.dateKey
              onHandled={() => fetchDataLagi()} // reload permintaan
            />
          ))}

        </View>
      </ScrollView>
    </View>
  );
};

export default PermintaanUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  contenttext: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    marginLeft: 40,
    marginTop: 20,
  },
  contentWrapper: {
    backgroundColor: 'white',
    width: 400,
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: 24,
  },
});
