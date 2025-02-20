import { StatusBar, ScrollView, StyleSheet, Text, Platform, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Gap, PageHeaderAdminDua, SubNotification } from '../../components';
import { getDatabase, ref, get } from 'firebase/database';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const db = getDatabase();
      const submissionsRef = ref(db, 'submissions/');

      try {
        // Fetch submissions
        const submissionsSnapshot = await get(submissionsRef);
        if (submissionsSnapshot.exists()) {
          const submissions = submissionsSnapshot.val();

          // Flatten the submissions object to an array
          const submissionList = [];
          Object.keys(submissions).forEach((userName) => {
            const userSubmissions = submissions[userName];
            Object.keys(userSubmissions).forEach((missionId) => {
              submissionList.push({
                userName: userName,
                ...userSubmissions[missionId],
              });
            });
          });

          setNotifications(submissionList);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="#0A3832"
      />
      <PageHeaderAdminDua />
      <View style={styles.contentWrapper}>
        <Text style={styles.contenttext}>Notifikasi</Text>
        <Gap height={16} />

        {/* Render notifications */}
        <FlatList
    data={notifications}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
        <View>
            <SubNotification
                name={item.userName}
                date={new Date(item.date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
                onPress={() => {
                    console.log('Navigating to Validation with:', item.userName, item.missionId);
                    navigation.navigate('Validation', { userName: item.userName, missionId: item.missionId });
                }}
            />
            <Gap height={16} />
        </View>
    )}
/>
      </View>
    </ScrollView>
  );
};

export default Notification;

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