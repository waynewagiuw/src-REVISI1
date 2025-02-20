import { StatusBar, ScrollView, StyleSheet, Text, Platform, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Buttonproduk, Gap, PageHeaderAdminDua, ValidationUploadpicture } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const Validation = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [images, setImages] = useState({
        before: null,
        selfie: null,
        after: null,
    });

    useEffect(() => {
        // Fetch the logged-in user's username
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const db = getDatabase();
            const userRef = ref(db, `users/${user.uid}`);

            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                if (data && data.username) {
                    setUsername(data.username);

                    // Fetch images based on the username
                    const submissionsRef = ref(db, `submissions/${data.username}`);
                    onValue(submissionsRef, (snapshot) => {
                        const submissionData = snapshot.val();
                        if (submissionData) {
                            // Assuming the latest submission is the one to be validated
                            const latestSubmission = Object.values(submissionData)[0];
                            setImages({
                                before: latestSubmission.imageBefore || null,
                                selfie: latestSubmission.imageSelfie || null,
                                after: latestSubmission.imageAfter || null,
                            });
                        }
                    });
                }
            });
        }
    }, []);

    const handleKirim = () => {
        navigation.navigate('TerimaSubmit');
    };

    return (
        <ScrollView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832"
            />
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
                <Buttonproduk
                    label="Terima"
                    onPress={handleKirim}
                    backgroundColor="#135D66"
                />
                <Gap height={16} />
                <Buttonproduk
                    label="Tolak"
                    onPress={handleKirim}
                    backgroundColor="#0A3832"
                />
                <Gap height={66} />
            </View>
        </ScrollView>
    );
};

export default Validation;

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
});