import { StatusBar, ScrollView, StyleSheet, Text, Platform, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { Detailsubmission, Gap, PageHeaderdua, PopUpTerimaMisi } from '../../components';
import Null from '../../assets/icon/null.png';

const TerimaMisi = ({ navigation, route }) => {
  const { missionId, userName } = route.params; // Access missionId and userName from route.params
  const [missionDetails, setMissionDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const missionRef = ref(db, `missions/${missionId}`);

    const unsubscribe = onValue(missionRef, (snapshot) => {
      if (snapshot.exists()) {
        const mission = snapshot.val();
        setMissionDetails(mission);
      } else {
        console.log("Mission not found");
      }
    });

    return () => unsubscribe();
  }, [missionId]);

  const handleYa = () => {
    const db = getDatabase();
    const missionRef = ref(db, `missions/${missionId}`);
    const userMissionRef = ref(db, `userMissions/${userName}/${missionId}`); // Store user-specific mission data
    const currentStatus = missionDetails.status.split("/");
    const currentAccepted = parseInt(currentStatus[0]);
    const quota = missionDetails.quota;

    if (currentAccepted < quota) {
      const newStatus = `${currentAccepted + 1}/${quota}`;

      // Update mission status and mark it as accepted for the user
      update(missionRef, {
        status: newStatus,
      })
        .then(() => {
          // Save the mission as accepted for the specific user
          update(userMissionRef, {
            isAccepted: true, // Mark the mission as accepted
            missionId: missionId,
            task: missionDetails.task, // Add task to user mission
            points: missionDetails.points,
            time: missionDetails.time,
          })
            .then(() => {
              alert('Misi diterima!');
              setShowPopup(false);
              navigation.navigate('Submission', { missionId, userName }); // Navigasi ke halaman Submission
            })
            .catch((error) => {
              console.error("Error updating user mission data: ", error);
            });
        })
        .catch((error) => {
          console.error("Error updating mission status: ", error);
        });
    } else {
      alert("Kuota penuh! Misi tidak dapat diterima.");
    }
  };

  const handleTidak = () => {
    setShowPopup(false);
    navigation.navigate('MissionDetail', { missionId, userName }); // Navigasi kembali ke MissionDetail
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
        <Text style={styles.contenttext}>Detail Misi</Text>
        <Detailsubmission
          task={missionDetails.task}
          time={missionDetails.time}
          points={missionDetails.points}
          quota={`${missionDetails.quota}`}
          description={missionDetails.description}
          pic={missionDetails.imageSource ? { uri: missionDetails.imageSource } : Null}
        />
        <Gap height={160} />
      </View>

      {showPopup && (
        <View style={styles.popup}>
          <PopUpTerimaMisi
            title="Terima misi ini?"
            missionId={missionId}
            onPressYes={handleYa} // Fungsi Yes
            onPressNo={handleTidak} // Fungsi No
          />
        </View>
      )}
      <Gap height={46} />
    </ScrollView>
  );
};

export default TerimaMisi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  contentWrapper: {
    backgroundColor: 'white',
    width: 400,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 80,
  },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  contenttext: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    marginLeft: 40,
    marginTop: 20,
  },
  popup: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    height: '130%',
    top: -150,
    justifyContent: 'center',
    zIndex: 1,
  },
});
