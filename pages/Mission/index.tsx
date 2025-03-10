import { StatusBar, ScrollView, StyleSheet, Text, Platform, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Gap, PageHeaderdua, SubMission } from '../../components';
import Null from '../../assets/icon/null.png';

const Mission = ({ navigation }) => {
  const [missions, setMissions] = useState([]);
  const [userName, setUserName] = useState(null); // Store the username of the logged-in user
  const [userMissions, setUserMissions] = useState([]); // Store the missions accepted by the user

  const auth = getAuth();
  const user = auth.currentUser;

  // Fetch the username of the logged-in user
  useEffect(() => {
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`); // Reference to the user's data

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUserName(userData.username || 'Unknown User'); // Set the username
            fetchUserMissions(userData.username); // Fetch the missions accepted by the user
          } else {
            console.log('User data not found');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [user]);

  // Fetch missions from Firebase
  useEffect(() => {
    const db = getDatabase();
    const missionsRef = ref(db, 'missions/');

    const unsubscribe = onValue(missionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const fetchedMissions = snapshot.val();
        const missionList = Object.keys(fetchedMissions).map((key) => ({
          id: key,
          ...fetchedMissions[key],
        }));
        setMissions(missionList);
      } 
    });

    return () => unsubscribe();
  }, []);

  // Fetch the missions accepted by the user
  const fetchUserMissions = (username) => {
    const db = getDatabase();
    const userMissionsRef = ref(db, `userMissions/${username}`);

    onValue(userMissionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const fetchedUserMissions = snapshot.val();
        const userMissionList = Object.keys(fetchedUserMissions).map((key) => ({
          id: key,
          ...fetchedUserMissions[key],
        }));
        setUserMissions(userMissionList);
      } 
    });
  };

  const handleImagePress = (mission) => {
    if (!userName) {
      alert('Username not found. Please try again.');
      return;
    }

    // Check if the user has already accepted the mission
    const userMission = userMissions.find((m) => m.id === mission.id);
    if (userMission && userMission.isAccepted) {
      // If the mission is already accepted, navigate to the Submission screen
      navigation.navigate('Submission', { missionId: mission.id, userName });
    } else {
      // If the mission is not accepted yet, navigate to the MissionDetail screen
      navigation.navigate('MissionDetail', { missionId: mission.id, userName });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#0A3832" />
      <View style={styles.headerWrapper}>
        <PageHeaderdua />
      </View>
      <ScrollView style={styles.scrollWrapper}>
        <View style={styles.contentWrapper}>
          <Text style={styles.contenttext}>Misi</Text>
          {missions.map((mission) => {
            const imageSource = mission.imageSource ? { uri: mission.imageSource } : Null;
            const status = parseInt(mission.status, 10);
            const quota = parseInt(mission.quota, 10);
            return (
              <SubMission
                key={mission.id}
                imageSource={imageSource} // Fallback to default image if no imageSource in mission
                time={mission.time}
                task={mission.task}
                points={mission.points}
                status={status}
                quota={quota}
                onPress={() => handleImagePress(mission)} // Pass mission to handle press
              />
            );
          })}
          <Gap height={46} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Mission;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: 'white',

    },
    headerWrapper: {
      position: 'absolute',
      left: 0,
      top: 20,
      right: 0,
      zIndex: 1,
    },
    scrollWrapper: {
      marginTop: 80,
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