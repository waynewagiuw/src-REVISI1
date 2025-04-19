import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, StatusBar } from 'react-native';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { Buttonproduk, Gap, PageHeaderAdminDua, ValidationUploadpicture } from '../../components';

const Validation = ({ route, navigation }) => {
    const { userName, missionId } = route.params; // Ensure userName is passed as a parameter

    const [images, setImages] = useState({
        before: null,
        selfie: null,
        after: null,
    });
    const [progress, setProgress] = useState('');
    const [missionPoints, setMissionPoints] = useState(0);
    const [userPoints, setUserPoints] = useState(0); // State to hold user points
    const [userUID, setUserUID] = useState(''); // State to hold user UID
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false); // Track if submission is accepted or rejected

    useEffect(() => {
        const db = getDatabase();
        const submissionRef = ref(db, `submissions/${userName}/${missionId}`);
        const missionRef = ref(db, `missions/${missionId}`);
        const userRef = ref(db, `users`); // Reference to users data

        // Fetch submission details
        onValue(submissionRef, (snapshot) => {
            if (snapshot.exists()) {
                const submissionData = snapshot.val();
                setImages({
                    before: submissionData.imageBefore,
                    selfie: submissionData.imageSelfie,
                    after: submissionData.imageAfter,
                });
                setProgress(submissionData.progress || 'Menunggu Validasi');
                setIsSubmitted(submissionData.progress === 'Berhasil' || submissionData.progress === 'Gagal'); // Check if already submitted
            }
        });

        // Fetch mission points
        onValue(missionRef, (snapshot) => {
            if (snapshot.exists()) {
                setMissionPoints(snapshot.val().points || 0);
            }
        });

        // Fetch user UID based on username
        onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
                const usersData = snapshot.val();
                for (const uid in usersData) {
                    if (usersData[uid].username === userName) {
                        setUserUID(uid); // Set the UID for the user
                        setUserPoints(usersData[uid].userpoints || 0); // Set initial user points
                        break; // Exit loop once found
                    }
                }
            }
            setIsLoading(false);
        });
    }, [userName, missionId]);

    const handleAccept = () => {
        const db = getDatabase();
        const submissionRef = ref(db, `submissions/${userName}/${missionId}`);
        const userRef = ref(db, `users/${userUID}`); // Reference to user data

        // Update the submission status to 'Berhasil'
        update(submissionRef, { progress: 'Berhasil', subpoints: missionPoints }).then(() => {
            // Calculate new user points
            const newUserPoints = Number(userPoints) + Number(missionPoints); // Ensure points are added correctly
            update(userRef, { userpoints: newUserPoints }).then(() => {
                setProgress('Berhasil');
                setIsSubmitted(true); // Mark as submitted
            }).catch((error) => {
                console.error('Error updating user points:', error);
            });
        }).catch((error) => {
            console.error('Error updating submission progress:', error);
        });
    };

    const handleReject = () => {
        const db = getDatabase();
        const submissionRef = ref(db, `submissions/${userName}/${missionId}`);
        update(submissionRef, { progress: 'Gagal', subpoints: 0 }).then(() => {
            setProgress('Gagal');
            setIsSubmitted(true); // Mark as submitted
        }).catch((error) => {
            console.error('Error rejecting submission:', error);
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
                <ValidationUploadpicture pic={images.before} label="Foto Sebelum :" />
                <ValidationUploadpicture pic={images.selfie} label="Foto Diri di Lokasi :" />
                <ValidationUploadpicture pic={images.after} label="Foto Sesudah :" />
                <Gap height={16} />
                <Text style={styles.progressText}>Progress: {progress}</Text>
                <Gap height={16} />
                {isSubmitted ? (
                    <Text style={[styles.statusText, progress === 'Gagal' && styles.errorText]}>
                        {progress === 'Berhasil'
                            ? 'Submission ini telah diterima.'
                            : 'Submission ini telah ditolak.'}
                    </Text>
                ) : (
                    <>
                        <Buttonproduk label="Terima" onPress={handleAccept} backgroundColor="#135D66" />
                        <Gap height={16} />
                        <Buttonproduk label="Tolak" onPress={handleReject} backgroundColor="#D00F0F" />
                    </>
                )}
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
    progressText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: 'black',
        marginLeft: 40,
    },
    statusText: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        marginLeft: 40,
        color: 'green',
    },
    errorText: {
        color: 'red', // Set the text color to red for rejection
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
    },
});

export default Validation;