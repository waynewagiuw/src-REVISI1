import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, PermissionsAndroid } from 'react-native';
import Gap from '../Gap';
import { launchCamera } from 'react-native-image-picker';

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
      <View style={styles.contentWrapper}>
        <Image
          source={photo ? { uri: photo } : { uri: pic }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Gap height={24} />
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
});