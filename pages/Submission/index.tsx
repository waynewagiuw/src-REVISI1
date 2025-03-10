import { StatusBar, ScrollView, StyleSheet, Text, Platform, View, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Gap, PageHeaderdua, Uploadpicture } from '../../components';
import Null from '../../assets/icon/null.png';

const Submission = ({ route, navigation }) => {
  const { missionId, userName } = route.params;
  const [imageBefore, setImageBefore] = useState(null);
  const [imageSelfie, setImageSelfie] = useState(null);
  const [imageAfter, setImageAfter] = useState(null);
  const [missionDetails, setMissionDetails] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  // Fetch mission details and points
  useEffect(() => {
    const db = getDatabase();
    const missionRef = ref(db, `missions/${missionId}`);

    const unsubscribeMission = onValue(missionRef, (snapshot) => {
      if (snapshot.exists()) {
        setMissionDetails(snapshot.val());
      } else {
        console.log('Mission not found');
      }
    });

    return () => unsubscribeMission();
  }, [missionId]);

  useEffect(() => {
    const db = getDatabase();
    const userSubmissionRef = ref(db, `submissions/${userName}/${missionId}`);

    const unsubscribeSubmission = onValue(userSubmissionRef, (snapshot) => {
      if (snapshot.exists()) {
        setIsSubmitted(true);
      } else {
        setIsSubmitted(false);
      }
    });

    return () => unsubscribeSubmission();
  }, [userName, missionId]);

  const handleKirim = () => {
    const db = getDatabase();
    const submissionRef = ref(db, `submissions/${userName}/${missionId}`);
    if (!imageBefore || !imageSelfie || !imageAfter) {
      Alert.alert('Error', 'Formulir harus dipenuhi', [{ text: 'OK' }]);
      return;
    }
    
    // Use mission points for subpoints
    const submissionData = {
      userName,
      missionId,
      imageBefore,
      imageSelfie,
      imageAfter,
      date: new Date().toISOString(),
      progress: 'Menunggu Validasi',
      task: missionDetails.task,
      subpoints: missionDetails.points, // Save the mission points as subpoints
    };

    set(submissionRef, submissionData)
      .then(() => {
        const notificationRef = ref(db, `notifications/${userName}/${missionId}`);
        const notificationData = {
          task: missionDetails.task,
          date: new Date().toISOString(),
          userName,
          missionId,
        };

        set(notificationRef, notificationData)
          .then(() => {
            navigation.navigate('Mission');
          })
          .catch((error) => console.error("Error saving notification data: ", error));
      })
      .catch((error) => console.error('Error submitting mission:', error));
  };

  if (!missionDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#0A3832" />
      <PageHeaderdua />
      <View style={styles.contentWrapper}>
        <Text style={styles.contenttext}>Submilt Misi</Text>
        <Gap height={36} />

        {isSubmitted ? (
          <Text style={{ textAlign: 'center', color: 'red', fontSize: 16 }}>
            Anda sudah mengirimkan submission sebelumnya.
          </Text>
        ) : (
          <>
            <Uploadpicture pic={imageBefore} label="Kirim foto sebelum :" onImagePicked={setImageBefore} />
            <Uploadpicture pic={imageSelfie} label="Kirim foto diri di lokasi :" onImagePicked={setImageSelfie} />
            <Uploadpicture pic={imageAfter} label="Kirim foto sesudah :" onImagePicked={setImageAfter} />
            <Gap height={16} />
            <TouchableOpacity onPress={handleKirim} style={styles.acceptButton}>
              <Text style={styles.acceptButtonText}>Kirim</Text>
            </TouchableOpacity>
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
    backgroundColor: 'white',
  },
  contentWrapper: {
    backgroundColor: 'white',
    width: 400,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  contenttext: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    marginLeft: 40,
    marginTop: 20,
  },
  acceptButton: {
    backgroundColor: '#0A3832',
    padding: 14,
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 50,
  },
  acceptButtonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
});
