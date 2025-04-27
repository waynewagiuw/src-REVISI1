import { StatusBar, ScrollView, StyleSheet, Text, Platform, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Buttonproduk, SubMissionAdmin, PageHeaderAdminDua, SubMissionSuperAdmin, PageHeaderAdmin, } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue, push, set, remove } from 'firebase/database';
import Null from '../../assets/icon/null.png';

const MissionAdmin = () => {
  const navigation = useNavigation();
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const missionsRef = ref(db, 'missions/');

    const unsubscribe = onValue(missionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const fetchedMissions = snapshot.val();
        const missionList = Object.keys(fetchedMissions).map(key => ({
          id: key,
          ...fetchedMissions[key],
        }));

        // Sort missions by postedAt timestamp in descending order
        missionList.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
        setMissions(missionList);
      } else {
        console.log("No missions found");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddMission = () => {
    navigation.navigate('AddMission', {
      onNewMission: (newMission) => {
        const db = getDatabase();
        const missionsRef = ref(db, 'missions/');
        const newMissionRef = push(missionsRef);

        set(newMissionRef, newMission)
          .then(() => {
            console.log('New mission added');
          })
          .catch((error) => {
            console.error("Error adding mission to Firebase: ", error);
          });
      },
    });
  };

  const handleDeleteMission = (missionId) => {
    const db = getDatabase();
    const missionRef = ref(db, 'missions/' + missionId);

    remove(missionRef)
      .then(() => {
        console.log('Mission deleted from Firebase');
        setMissions((prevMissions) => prevMissions.filter(mission => mission.id !== missionId));
      })
      .catch((error) => {
        console.error('Error deleting mission: ', error);
      });
};

  const handleMissionPress = (missionId, task) => {
    navigation.navigate('Notification', { missionId, task });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#0A3832" />
      <PageHeaderAdmin />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentWrapper}>
          <Text style={styles.contenttext}>Misi</Text>
          {missions.map((mission, index) => {
            const imageSource = mission.imageSource ? { uri: mission.imageSource } : Null;
            const status = parseInt(mission.status, 10);
            const quota = parseInt(mission.quota, 10);

            return (

              <SubMissionSuperAdmin
                key={mission.id}
                imageSource={imageSource}
                time={mission.time}
                task={mission.task}
                points={mission.points}
                status={status}
                quota={quota}
                expire={mission.availableUntil} // Pastikan ada properti ini
                supervisor={mission.supervisor} // Pastikan ada properti ini
                onDelete={() => handleDeleteMission(mission.id)}
                onPress={() => handleMissionPress(mission.id, mission.task)} // Handle mission press
              />
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <Buttonproduk label="Buat Misi" onPress={handleAddMission} backgroundColor='#0A3832' />
      </View>
    </View>
  );
};

export default MissionAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 20,
    left: '42%',
    transform: [{ translateX: -150 }],
    width: '100%',
    zIndex: 1,
  },
});