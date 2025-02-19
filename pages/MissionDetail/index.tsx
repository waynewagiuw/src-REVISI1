import { StatusBar, ScrollView, StyleSheet, Text, Platform, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Detailsubmission, Gap, PageHeaderdua } from '../../components';
import Null from '../../assets/icon/null.png';

const MissionDetail = ({ route, navigation }) => {
  const { missionId } = route.params || {}; // Safely access missionId from route.params
  const [missionDetails, setMissionDetails] = useState(null);

  // Check if missionId is missing
  if (!missionId) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error: Mission ID not found</Text>
      </View>
    );
  }

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

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [missionId]);

  if (!missionDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Extract current status and quota
  const { status, quota } = missionDetails;

  // If status >= quota, the mission is full
  const isFull = status >= quota;

  // Function to navigate to 'TerimaMisi' and accept the mission
  const handleAcceptMission = () => {
    navigation.navigate('TerimaMisi', {
      missionId,
    });
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled" // Ensure TouchableOpacity works inside ScrollView
    >
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="#0A3832"
      />
      <View style={styles.headerWrapper}>
        <PageHeaderdua />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.contenttext}>Detail Misi</Text>
        <Detailsubmission
          task={missionDetails.task}
          time={missionDetails.time}
          points={missionDetails.points}
          status={status} // Display current status
          quota={quota} // Display the quota
          description={missionDetails.description}
          pic={missionDetails.imageSource ? { uri: missionDetails.imageSource } : Null}
        />

        {/* Show message if mission is full */}
        {isFull ? (
          <Text style={styles.fullText}>Misi sudah penuh</Text>
        ) : (
          <TouchableOpacity onPress={handleAcceptMission} style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>Terima</Text>
          </TouchableOpacity>
        )}
      </View>
      <Gap height={46} />
    </ScrollView>
  );
};

export default MissionDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  contentWrapper: {
    backgroundColor: 'white',
    width: 400,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 80,
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
  fullText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});