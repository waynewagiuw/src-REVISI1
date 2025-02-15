import { StatusBar, ScrollView, StyleSheet, Text, Platform, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Buttonproduk, SubMissionAdmin, PageHeaderAdmin } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue, push, set, remove } from 'firebase/database';

const HomeAdmin = () => {
  const navigation = useNavigation();
  const [missions, setMissions] = useState([]);

  // Fetch data from Firebase with real-time listener
  useEffect(() => {
    const db = getDatabase();
    const missionsRef = ref(db, 'missions/');

    // Real-time listener for any changes to missions
    const unsubscribe = onValue(missionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const fetchedMissions = snapshot.val();
        const missionList = Object.keys(fetchedMissions).map(key => ({
          id: key,
          ...fetchedMissions[key],
        }));
        setMissions(missionList);  // Update the state with the new list of missions
      } else {
        console.log("No missions found");
      }
    });

    // Cleanup the listener when the component unmounts or re-renders
    return () => unsubscribe();
  }, []);  // Empty dependency array to listen only on mount

  const handleAddMission = () => {
    navigation.navigate('AddMission', {
      onNewMission: (newMission) => {
        const db = getDatabase();
        const missionsRef = ref(db, 'missions/'); 
        const newMissionRef = push(missionsRef);  // Use push() to append mission

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

  const handleDeleteMission = (index, missionId) => {
    const db = getDatabase();
    const missionRef = ref(db, 'missions/' + missionId); // Reference to the mission you want to delete
    
    // Call remove with the correct reference
    remove(missionRef)
      .then(() => {
        console.log('Mission deleted from Firebase');
        setMissions((prevMissions) => prevMissions.filter((_, i) => i !== index));
      })
      .catch((error) => {
        console.error('Error deleting mission: ', error);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#0A3832" />
      <PageHeaderAdmin />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentWrapper}>
          <Text style={styles.contenttext}>Misi</Text>
          {missions.map((mission, index) => {
            const imageSource = mission.imageSource ? { uri: mission.imageSource } : { uri: 'https://example.com/default-image.png' };
            
            return (
              <SubMissionAdmin
                key={mission.id} 
                imageSource={imageSource}  
                time={mission.time}
                task={mission.task}
                points={mission.points}
                status={mission.status}
                quota={mission.quota}
                description={mission.description.length > 50 ? mission.description.substring(0, 50) + '...' : mission.description}
                onImagePress={() => navigation.navigate('MissionDetail')}
                onDelete={() => handleDeleteMission(index, mission.id)} // Add delete handler
              />
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <Buttonproduk label="Tambah Misi" onPress={handleAddMission} backgroundColor='#0A3832' />
      </View>
    </View>
  );
};

export default HomeAdmin;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  contenttext: { fontSize: 18, fontFamily: 'Poppins-Bold', color: 'black', marginLeft: 40, marginTop: 20 },
  contentWrapper: { backgroundColor: 'white', width: '100%', justifyContent: 'center', alignSelf: 'center' },
  scrollViewContent: { paddingBottom: 80 },
  buttonWrapper: { position: 'absolute', bottom: 20, left: '37%', transform: [{ translateX: -150 }], width: '100%', zIndex: 1 },
});
