import React, { useState, useEffect } from 'react';
import { StatusBar, ScrollView, StyleSheet, Text, Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Buttonproduk, Gap, PageHeaderAdminDua, ValidationUploadpicture } from '../../components';

const Validation = ({ route }) => {
    const navigation = useNavigation();
    const { userName, missionId, task } = route.params;

    const [images, setImages] = useState({
        before: null,
        selfie: null,
        after: null,
    });
    const [progress, setProgress] = useState('');
    const [isLoading, setIsLoading] = useState(true); // To track loading state

    useEffect(() => {
        if (!userName || !missionId || !task) {
            console.error('Missing required parameters: userName, missionId, or task');
            navigation.goBack(); // Navigate back if parameters are missing
            return;
        }

        const db = getDatabase();
        const submissionRef = ref(db, `submissions/${userName}/${missionId}`);

        // Fetch submission details
        const unsubscribeSubmission = onValue(submissionRef, (snapshot) => {
            if (snapshot.exists()) {
                const submissionData = snapshot.val();

                // Check if the task matches
                if (submissionData.task === task) {
                    setImages({
                        before: submissionData.imageBefore,
                        selfie: submissionData.imageSelfie,
                        after: submissionData.imageAfter,
                    });
                    setProgress(submissionData.progress || 'Menunggu Validasi'); // Set progress
                }
            } else {
                console.log('Submission not found');
            }
            setIsLoading(false); // Stop loading after fetching data
        });

        return () => unsubscribeSubmission; // Cleanup on unmount
    }, [userName, missionId, task, navigation]);

    const handleAccept = () => {
        if (!userName || !missionId) return;

        const db = getDatabase();
        const submissionRef = ref(db, `submissions/${userName}/${missionId}`);
        update(submissionRef, { progress: 'Berhasil' }) // Mark as successful
            .then(() => {
                setProgress('Berhasil');
                navigation.goBack(); // Navigate back after success
            })
            .catch((error) => {
                console.error('Error updating submission progress:', error);
            });
    };

    const handleReject = () => {
        if (!userName || !missionId) return;

        const db = getDatabase();
        const submissionRef = ref(db, `submissions/${userName}/${missionId}`);
        update(submissionRef, { progress: 'Gagal' }) // Mark as failed
            .then(() => {
                setProgress('Gagal');
                navigation.goBack(); // Navigate back after rejection
            })
            .catch((error) => {
                console.error('Error updating submission progress:', error);
            });
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#0A3832" />
            <PageHeaderAdminDua />
            <View style={styles.contentWrapper}>
                <Text style={styles.contenttext}>Validasi</Text>
                <Gap height={36} />
                <ValidationUploadpicture
                    pic={images.before}
                    label="Foto Sebelum:"
                />
                <ValidationUploadpicture
                    pic={images.selfie}
                    label="Foto Diri di Lokasi:"
                />
                <ValidationUploadpicture
                    pic={images.after}
                    label="Foto Sesudah:"
                />
                <Gap height={16} />
                <Text style={styles.progressText}>Progress : {progress}</Text>
                <Gap height={16} />
                <Buttonproduk
                    label="Terima"
                    onPress={handleAccept}
                    backgroundColor="#135D66"
                />
                <Gap height={16} />
                <Buttonproduk
                    label="Tolak"
                    onPress={handleReject}
                    backgroundColor="#D00F0F"
                />
                <Gap height={66} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: 400,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    progressText: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        color: 'black',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    loadingText: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: 'black',
    },
});

export default Validation;
