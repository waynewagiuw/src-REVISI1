import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, PermissionsAndroid, Alert, ImageBackground } from 'react-native';
import Gap from '../Gap';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Null from '../../../assets/icon/uploadpic.png';

const Uploadpicture = ({ label, pic, onImagePicked }) => {
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
        handleCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true, // ✅ Tambahkan base64 agar gambar bisa terlihat di semua device
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      } else {
        const data = response.assets[0];
        const base64Image = `data:image/jpeg;base64,${data.base64}`; // ✅ Konversi ke base64
        setPhoto(base64Image);
        onImagePicked(base64Image);
      }
    });
  };

  const handleGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true, // ✅ Tambahkan base64 agar gambar bisa terlihat di semua device
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      } else {
        const data = response.assets[0];
        const base64Image = `data:image/jpeg;base64,${data.base64}`; // ✅ Konversi ke base64
        setPhoto(base64Image);
        onImagePicked(base64Image);
      }
    });
  };

  const handleChooseOption = () => {
    Alert.alert(
      'Upload Picture',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: requestCameraPermission },
        { text: 'Choose from Gallery', onPress: handleGallery },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.contentwrapper} onPress={handleChooseOption}>
        <ImageBackground 
          source={photo ? { uri: photo } : null} 
          style={styles.imageBackground} 
          resizeMode="cover"
        >
          {!photo && (
            <Image source={Null} style={styles.image} resizeMode="cover" />
          )}
        </ImageBackground>
      </TouchableOpacity>
      <Gap height={24} />
    </View>
  );
};

export default Uploadpicture;

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
    padding: 0,
    marginVertical: 7,
  },
  label: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  imageBackground: {
    width: '100%',
    height: 150, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
  },
});
