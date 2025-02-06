import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, PermissionsAndroid } from 'react-native';
import Gap from '../Gap';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ValidationUploadpicture = ({ label, pic }) => {
  const [photo, setPhoto] = useState(null); 

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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.contentwrapper}>
            <Image
              source={photo ? { uri: photo } : pic} 
              resizeMode="cover"
            />
      </View>
      <Gap height={24}/>
    </View>
  );
};

export default ValidationUploadpicture;

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
    borderColor: 'black',
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
