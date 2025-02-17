import { StatusBar, TouchableOpacity, ScrollView, StyleSheet, Text, Platform, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { Detailsubmission, Gap, PageHeaderdua, PopUpTerimaMisi } from '../../components'; // Ensure PopUpTerimaMisi is imported
import Null from '../../assets/icon/null.png';

const TerimaMisi = ({ navigation, route }) => {
    const { missionId } = route.params;
    const [missionDetails, setMissionDetails] = useState(null);
    const [showPopup, setShowPopup] = useState(true); // Popup shows as soon as the page loads
  
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
      const currentStatus = missionDetails.status.split("/"); // Split to get current accepted/total
      const currentAccepted = parseInt(currentStatus[0]);
      const quota = missionDetails.quota;
  
      if (currentAccepted < quota) {
        const newStatus = `${currentAccepted + 1}/${quota}`; // Increment the accepted count
  
        // Update mission status in Firebase
        update(missionRef, {
          status: newStatus,
        }).then(() => {
          alert('Misi diterima!');
          setShowPopup(false); // Hide the popup after accepting
          navigation.navigate('Submission');  // Navigate to the Submission page after accepting the mission
        }).catch((error) => {
          console.error("Error updating mission status: ", error);
        });
      } else {
        alert("Kuota penuh! Misi tidak dapat diterima.");
      }
    };
  
    const handleTidak = () => {
      setShowPopup(false); // Close the popup if "No" is clicked
      navigation.navigate('MissionDetail', { missionId });  // Navigate back to MissionDetail with the missionId
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
        <View style={styles.headerWrapper}>
          <PageHeaderdua />
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.contenttext}>Detail Misi</Text>
          <Detailsubmission
            task={missionDetails.task}
            time={missionDetails.time}
            points={missionDetails.points}
            quota={`${missionDetails.quota}`}  // Display current status/total quota
            description={missionDetails.description}
            pic={missionDetails.imageSource ? { uri: missionDetails.imageSource } : Null} // Display image
          />
         <Gap height={160}/>
  
        </View>
  
        {/* Conditionally render the popup */}
        {showPopup && (
          <View style={styles.popup}>
            <PopUpTerimaMisi
              title="Terima misi ini?"
              missionId={missionId}
              onPressYes={handleYa}
              onPressNo={handleTidak}
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Semi-transparent background for the main screen
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
    marginTop: 20
  },
  acceptButton: {
    backgroundColor: '#0A3832',
    padding: 10,
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
  fullText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Background opacity
    width: '100%',
    height: '130%',
    top: -150,
    justifyContent: 'center',
    zIndex: 1,
  },
});
