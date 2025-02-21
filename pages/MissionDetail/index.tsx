import {
    StatusBar,
    ScrollView,
    StyleSheet,
    Text,
    Platform,
    View,
    TouchableOpacity,
    Image,
    Modal,
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import { getDatabase, ref, onValue, update } from 'firebase/database';
  import { Detailsubmission, Gap, PageHeaderdua } from '../../components';
  import Null from '../../assets/icon/null.png';
  
  const MissionDetail = ({ route, navigation }) => {
    const { missionId, userName } = route.params;
    const [missionDetails, setMissionDetails] = useState(null);
    const [userMission, setUserMission] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
  
    useEffect(() => {
      const db = getDatabase();
      const missionRef = ref(db, `missions/${missionId}`);
      const userMissionRef = ref(db, `userMissions/${userName}/${missionId}`);
  
      // Fetch mission details
      const unsubscribeMission = onValue(missionRef, (snapshot) => {
        if (snapshot.exists()) {
          setMissionDetails(snapshot.val());
        } else {
          console.log('Mission not found');
        }
      });
  
      // Fetch user-specific mission data
      const unsubscribeUserMission = onValue(userMissionRef, (snapshot) => {
        if (snapshot.exists()) {
          const userMissionData = snapshot.val();
          setUserMission(userMissionData);
          setIsSubmitted(userMissionData.isSubmitted || false);
        } else {
          setUserMission(null);
          setIsSubmitted(false);
        }
      });
  
      return () => {
        unsubscribeMission();
        unsubscribeUserMission();
      };
    }, [missionId, userName]);
  
    const handleAcceptMission = () => {
      const db = getDatabase();
      const missionRef = ref(db, `missions/${missionId}`);
      const userMissionRef = ref(db, `userMissions/${userName}/${missionId}`);
  
      if (missionDetails && userMission === null) {
        const currentStatus = parseInt(missionDetails.status.split('/')[0], 10);
        const quota = parseInt(missionDetails.quota, 10);
  
        if (currentStatus < quota) {
          const newStatus = `${currentStatus + 1}/${quota}`;
  
          // Update mission status and mark it as accepted for the user
          update(missionRef, { status: newStatus })
            .then(() => {
              update(userMissionRef, {
                isAccepted: true,
                isSubmitted: false,
                missionId: missionId,
              })
                .then(() => {
                  alert('Misi berhasil diterima!');
                  navigation.navigate('Submission', { missionId, userName });
                })
                .catch((error) => {
                  console.error('Error updating user mission data: ', error);
                });
            })
            .catch((error) => {
              console.error('Error updating mission status: ', error);
            });
        } else {
          alert('Kuota penuh! Misi tidak dapat diterima.');
        }
      } else {
        alert('Misi sudah diterima sebelumnya.');
        navigation.navigate('Submission', { missionId, userName });
      }
    };
  
    const handleBack = () => {
      navigation.goBack();
    };
  
    const handleImagePress = (imageUri) => {
      setSelectedImage(imageUri);
      setIsModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setIsModalVisible(false);
      setSelectedImage(null);
    };
  
    if (!missionDetails) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      );
    }
  
    const { task, time, points, description, imageSource, status, quota } = missionDetails;
    const isFull = parseInt(status.split('/')[0], 10) >= parseInt(quota, 10);
  
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#0A3832" />
        <View style={styles.headerWrapper}>
          <PageHeaderdua />
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.contenttext}>Detail Misi</Text>
          <TouchableOpacity onPress={() => handleImagePress(imageSource)}>
            <Detailsubmission
              task={task}
              time={time}
              points={points}
              status={status}
              quota={quota}
              description={description}
              pic={imageSource ? { uri: imageSource } : Null}
            />
          </TouchableOpacity>
  
          {isFull ? (
            <Text style={styles.fullText}>Misi sudah penuh</Text>
          ) : userMission && userMission.isAccepted ? (
            isSubmitted ? (
              <Text style={styles.fullText}>Anda sudah mengirimkan submission untuk misi ini.</Text>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate('Submission', { missionId, userName })}
                style={styles.acceptButton}
              >
                <Text style={styles.acceptButtonText}>Kirim Submission</Text>
              </TouchableOpacity>
            )
          ) : (
            <TouchableOpacity onPress={handleAcceptMission} style={styles.acceptButton}>
              <Text style={styles.acceptButtonText}>Terima Misi</Text>
            </TouchableOpacity>
          )}
        </View>
        <Gap height={46} />
  
        {/* Full-Screen Modal for Image */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={handleCloseModal}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={styles.fullScreenImage}
                resizeMode="contain"
              />
            )}
          </View>
        </Modal>
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
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fullScreenImage: {
      width: '90%',
      height: '80%',
    },
    modalCloseButton: {
      position: 'absolute',
      top: 40,
      right: 20,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 20,
    },
    closeText: {
      color: 'black',
      fontWeight: 'bold',
    },
  });