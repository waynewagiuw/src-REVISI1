import React, { useState, useEffect } from 'react';
import { StatusBar, ScrollView, StyleSheet, Text, View, Platform } from 'react-native';
import { Gap, PageHeaderAdminDua, SubNotificationUser } from '../../components';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const NotificationUser = () => {
  const [submissions, setSubmissions] = useState([]);
  const [missions, setMissions] = useState({});
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);

      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setCurrentUser(userData.username);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const db = getDatabase();

    const submissionsRef = ref(db, 'submissions/');
    const unsubscribeSubmissions = onValue(submissionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let submissionsData = [];

        Object.keys(data).forEach((userName) => {
          if (userName === currentUser) {
            const userSubmissions = data[userName];
            Object.keys(userSubmissions).forEach((missionId) => {
              const submission = userSubmissions[missionId];
              submissionsData.push({
                userName,
                missionId,
                progress: submission.progress || 'Menunggu Validasi',
                date: submission.date || '1970-01-01T00:00:00Z', // Ensure there's a date for sorting
              });
            });
          }
        });

        // **Sorting by latest date**
        submissionsData.sort((a, b) => new Date(b.date) - new Date(a.date));

        setSubmissions(submissionsData);
      } else {
        setSubmissions([]);
      }
    });

    const missionsRef = ref(db, 'missions/');
    const unsubscribeMissions = onValue(missionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const fetchedMissions = snapshot.val();
        setMissions(fetchedMissions);
      }
    });

    return () => {
      unsubscribeSubmissions();
      unsubscribeMissions();
    };
  }, [currentUser]);

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
            const missionDetails = getMissionDetails(submission.missionId);
            let progressStyle;

            // Determine the style based on the progress status
            if (submission.progress === 'Gagal') {
              progressStyle = styles.errorText; // Red for "Gagal"
            } else if (submission.progress === 'Berhasil') {
              progressStyle = styles.successText; // Green for "Berhasil"
            } else {
              progressStyle = styles.pendingText; // Black for "Menunggu Validasi"
            }

            return (
              <SubNotificationUser
                key={index}
                task={missionDetails.task}
                progress={<Text style={progressStyle}>{submission.progress}</Text>} // Pass styled progress text
                subpoin={missionDetails.points}
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
  errorText: {
    color: 'red', // Red color for "Gagal"
  },
  successText: {
    color: 'green', // Green color for "Berhasil"
  },
  pendingText: {
    color: 'black', // Black color for "Menunggu Validasi"
  },
});