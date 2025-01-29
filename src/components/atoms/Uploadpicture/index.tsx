import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, PermissionsAndroid } from 'react-native';
import Gap from '../Gap';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const KirimFotoComponent = ({ label, pic }) => {
  const [photo, setPhoto] = useState(null); // State to store the photo

  // Function to request camera permission
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
        handlePic(); // If permission is granted, open the camera
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Function to handle picture taking
  const handlePic = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    // Open the camera to take a photo
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User Cancelled image picker');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      } else {
        const data = response.assets[0]; // Get the first asset
        setPhoto(data.uri); // Set the photo URI to state
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.contentwrapper}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.uploadButton} onPress={requestCameraPermission}>
            <Image
              source={photo ? { uri: photo } : pic} // Show the selected photo or fallback to default
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default KirimFotoComponent;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: -20,
  },
  contentwrapper: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'black',
    padding: 12,
    marginVertical: 7,
  },
  label: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  inputWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    borderColor: '#ddd',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
    alignSelf: 'center',
  },
});
