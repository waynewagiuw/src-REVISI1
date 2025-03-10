import React, { useState, useEffect } from 'react';
import { StatusBar, ScrollView, StyleSheet, Text, View, Platform } from 'react-native';
import { Gap, PageHeaderAdminDua, SubNotificationUser } from '../../components';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const NotificationUser = () => {
  const [submissions, setSubmissions] = useState([]);
  const [missions, setMissions] = useState({}); // Store missions as an object for easier lookup
  const [currentUser, setCurrentUser] = useState(''); // Store the current user's username

  // Fetch the current user's username
  useEffect(() => {
    const auth = getAuth(); // Get the Firebase Auth instance
    const user = auth.currentUser; // Get the currently logged-in user

    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`); // Reference to the user's data in the database

      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setCurrentUser(userData.username); // Set the current user's username
        }
      });
    }
  }, []);

  // Fetch submissions and missions from Firebase
  useEffect(() => {
    if (!currentUser) return; // Wait until the current user's username is loaded

    const db = getDatabase();

    // Listen for real-time updates to submissions
    const submissionsRef = ref(db, 'submissions/');
    const unsubscribeSubmissions = onValue(submissionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const submissionsData = [];

        // Loop through submissions and filter by current user's username
        Object.keys(data).forEach((userName) => {
          if (userName === currentUser) {
            const userSubmissions = data[userName];
            Object.keys(userSubmissions).forEach((missionId) => {
              const submission = userSubmissions[missionId];
              submissionsData.push({
                userName,
                missionId,
                progress: submission.progress || 'Menunggu Validasi', // Default progress
              });
            });
          }
        });

        setSubmissions(submissionsData); // Save filtered submissions
      } else {
        setSubmissions([]); // Clear submissions if none exist
      }
    });

    // Listen for real-time updates to missions
    const missionsRef = ref(db, 'missions/');
    const unsubscribeMissions = onValue(missionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const fetchedMissions = snapshot.val();
        setMissions(fetchedMissions); // Save missions as an object
      }
    });

    // Cleanup listeners when the component unmounts or currentUser changes
    return () => {
      unsubscribeSubmissions();
      unsubscribeMissions();
    };
  }, [currentUser]); // Re-run when currentUser changes

  // Function to get the mission name and points based on missionId
  const getMissionDetails = (missionId) => {
    const mission = missions[missionId];
    return mission ? { task: mission.task, points: mission.points } : { task: 'Unknown Mission', points: 0 };
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#0A3832" />
      <PageHeaderAdminDua />
      <View style={styles.contentWrapper}>
        <Text style={styles.contenttext}>Notifikasi</Text>
        <Gap height={16} />

        <View>
          {submissions.map((submission, index) => {
            const missionDetails = getMissionDetails(submission.missionId); // Get mission details (task and points)
            return (
              <SubNotificationUser
                key={index}
                task={missionDetails.task} // Display mission task
                progress={submission.progress} // Display progress
                subpoin={missionDetails.points} // Display points
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default NotificationUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'white',
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