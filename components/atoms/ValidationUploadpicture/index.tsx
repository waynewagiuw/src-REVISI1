import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import Gap from '../Gap';
import { launchCamera } from 'react-native-image-picker';

const ValidationUploadpicture = ({ label, pic }) => {
  const [photo, setPhoto] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'We need access to your camera to take photos.',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
        handlePic();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handlePic = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User Cancelled image picker');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      } else {
        const data = response.assets[0];
        setPhoto(data.uri);
      }
    });
  };

  const handleImagePress = () => {
    setIsModalVisible(true);  // Show full-screen image modal
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);  // Close the modal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.contentWrapper}>
        <TouchableOpacity onPress={handleImagePress}>
          <Image
            source={photo ? { uri: photo } : { uri: pic }}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      <Gap height={24} />

      {/* Full-Screen Modal for Image */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity  onPress={handleCloseModal}>
            <Text style={styles.closeButtonText}> </Text>
          </TouchableOpacity>
          <Image
            source={photo ? { uri: photo } : { uri: pic }}
            style={styles.fullScreenImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
};

export default ValidationUploadpicture;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: -20,
  },
  contentWrapper: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 7,
  },
  label: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dimmed background
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
});
