import { StatusBar, ScrollView, StyleSheet, Text, Platform, View } from 'react-native';
import React, { useState } from 'react';
import { Buttonproduk, SubMissionAdmin, PageHeaderAdmin } from '../../components';
import CC from '../../assets/images/tesCC.jpg';
import { useNavigation } from '@react-navigation/native';

const HomeAdmin = () => {
  const navigation = useNavigation();
  const [missions, setMissions] = useState([]);

  const handleAddMission = () => {
    navigation.navigate('AddMission', {
      onNewMission: (newMission) => {
        setMissions((prevMissions) => [...prevMissions, newMission]);
      },
    });
  };

  const handleDeleteMission = (index) => {
    setMissions((prevMissions) => prevMissions.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#0A3832" />
      <PageHeaderAdmin />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentWrapper}>
          <Text style={styles.contenttext}>Misi</Text>
          {missions.map((mission, index) => (
            <SubMissionAdmin
              key={index}
              imageSource={mission.imageSource || CC}
              time={mission.time}
              task={mission.task}
              points={mission.points}
              status={mission.status}
              quota={mission.quota}
              description={mission.description.length > 50 ? mission.description.substring(0, 50) + '...' : mission.description}
              onImagePress={() => navigation.navigate('MissionDetail')}
              onDelete={() => handleDeleteMission(index)}
            />
          ))}
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
