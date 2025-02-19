import React, { useState, useEffect } from 'react';
import { StatusBar, ScrollView, StyleSheet, Text, View, Platform, Alert } from 'react-native';
import { Buttonproduk, Gap, PageHeaderdua, Uploadpicture } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, set, get } from 'firebase/database'; // Import for Realtime Database
import { getAuth } from 'firebase/auth';

const Submission = () => {
  const navigation = useNavigation();
  const [imageBefore, setImageBefore] = useState(null);
  const [imageSelfie, setImageSelfie] = useState(null);
  const [imageAfter, setImageAfter] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // To track submission status

  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null; // Get current user ID

  // Check if the user has already submitted
  useEffect(() => {
    if (userId) {
      const db = getDatabase();
      const submissionRef = ref(db, 'submissions/');

      get(submissionRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const submissions = snapshot.val();
            // Check if the user has already submitted based on their UID
            const userSubmission = Object.values(submissions).find(
              (submission) => submission.userId === userId
            );
            if (userSubmission) {
              setIsSubmitted(true); // Mark as submitted if user has already submitted
            }
          }
        })
        .catch((error) => {
          console.error('Error checking submission status:', error);
          Alert.alert('Error', 'Terjadi kesalahan saat memeriksa status pengiriman.', [
            { text: 'OK' },
          ]);
        });
    }
  }, [userId]);

  // Navigate to 'TerimaSubmit' if already submitted
  useEffect(() => {
    if (isSubmitted) {
      navigation.navigate('TerimaSubmit');
    }
  }, [isSubmitted, navigation]);

  const handleKirim = () => {
    // Prevent submission if the user has already submitted
    if (isSubmitted) {
      Alert.alert('Error', 'Anda sudah mengirimkan submission sebelumnya.', [{ text: 'OK' }]);
      return;
    }

    // Validate that all images are uploaded
    if (!imageBefore || !imageSelfie || !imageAfter) {
      Alert.alert('Error', 'Semua foto harus dipenuhi', [{ text: 'OK' }]);
      return;
    }

    if (userId) {
      const db = getDatabase();
      const submissionData = {
        userId: userId, // Store the userId along with the images
        imageBefore,
        imageSelfie,
        imageAfter,
      };

      const newSubmissionRef = ref(db, 'submissions/' + Date.now());
      set(newSubmissionRef, submissionData)
        .then(() => {
          setIsSubmitted(true); // Mark as submitted
          navigation.navigate('TerimaSubmit'); // Navigate to confirmation page after successful submission
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

        {/* Show message if already submitted */}
        {isSubmitted ? (
          <Text style={{ textAlign: 'center', color: 'red', fontSize: 16 }}>
            Anda sudah mengirimkan submission sebelumnya.
          </Text>
        ) : (
          <>
            {/* Upload Picture Components for 3 images */}
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
});