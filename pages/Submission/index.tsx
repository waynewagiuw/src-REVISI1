import { StatusBar, ScrollView, StyleSheet, Text, View, Platform, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Buttonproduk, Gap, PageHeaderdua, Uploadpicture } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, set, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const Submission = ({ route }) => {
  const navigation = useNavigation();
  const { missionId } = route.params; // Get missionId from route params
  const [imageBefore, setImageBefore] = useState(null);
  const [imageSelfie, setImageSelfie] = useState(null);
  const [imageAfter, setImageAfter] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // To track submission status
  const [userName, setUserName] = useState(null); // Store the user's name
  const [progress, setProgress] = useState(''); // State for progress

  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null; // Get current user ID

  // Fetch the user's name from Firebase
  useEffect(() => {
    if (userId) {
      const db = getDatabase();
      const userRef = ref(db, `users/${userId}`); // Reference to the user's data

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUserName(userData.username || 'Unknown User'); // Set the user's name
          } else {
            Alert.alert('Error', 'Data pengguna tidak ditemukan.', [{ text: 'OK' }]);
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          Alert.alert('Error', 'Terjadi kesalahan saat mengambil data pengguna.', [{ text: 'OK' }]);
        });
    }
  }, [userId]);

  // Fetch progress and submission data
  useEffect(() => {
    if (userName && missionId) {
      const db = getDatabase();
      const submissionRef = ref(db, `submissions/${userName}/${missionId}`);

      get(submissionRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setIsSubmitted(true); // Mark as submitted
            setProgress(data.progress || 'Menunggu Validasi'); // Set progress
          }
        })
        .catch((error) => {
          console.error('Error fetching submission data:', error);
          Alert.alert('Error', 'Terjadi kesalahan saat memeriksa status pengiriman.', [
            { text: 'OK' },
          ]);
        });
    }
  }, [userName, missionId]);

  const handleKirim = () => {
    if (!imageBefore || !imageSelfie || !imageAfter) {
      Alert.alert('Error', 'Semua foto harus dipenuhi', [{ text: 'OK' }]);
      return;
    }

    if (userName && missionId) {
      const db = getDatabase();
      const submissionData = {
        userName: userName,
        missionId: missionId,
        imageBefore,
        imageSelfie,
        imageAfter,
        date: new Date().toISOString(),
        progress: 'Menunggu Validasi',
      };

      const submissionRef = ref(db, `submissions/${userName}/${missionId}`);
      set(submissionRef, submissionData)
        .then(() => {
          setIsSubmitted(true);
          navigation.navigate('TerimaSubmit');
        })
        .catch((error) => {
          console.error('Error submitting mission:', error);
          Alert.alert('Error', 'Terjadi kesalahan saat mengirimkan data.', [{ text: 'OK' }]);
        });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#0A3832" />
      <PageHeaderdua />
      <View style={styles.contentWrapper}>
        <Text style={styles.contenttext}>Submit Misi</Text>
        <Gap height={36} />

        {isSubmitted ? (
          <Text style={{ textAlign: 'center', color: 'red', fontSize: 16 }}>
            Anda sudah mengirimkan submission sebelumnya.
          </Text>
        ) : (
          <>
            <Uploadpicture
              pic={imageBefore}
              label="Kirim foto sebelum   :"
              onImagePicked={setImageBefore}
            />
            <Uploadpicture
              pic={imageSelfie}
              label="Kirim foto diri di lokasi   :"
              onImagePicked={setImageSelfie}
            />
            <Uploadpicture
              pic={imageAfter}
              label="Kirim foto sesudah   :"
              onImagePicked={setImageAfter}
            />
            <Gap height={16} />
            <Buttonproduk label="Kirim" onPress={handleKirim} backgroundColor="#0A3832" />
          </>
        )}

        {/* Tampilkan progress */}
        <Gap height={16} />
        <Text style={styles.progressText}>Status Progress: {progress}</Text>
      </View>
    </ScrollView>
  );
};

export default Submission;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});