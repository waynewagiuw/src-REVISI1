import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, ScrollView, Platform, Alert, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { PageHeaderdua, Gap } from '../../components';

const ResetVerification = () => {
    const [staffUsername, setStaffUsername] = useState('');
    const navigation = useNavigation();

    const handleVerification = () => {
        const db = getDatabase();
        const adminRef = ref(db, 'admins');

        onValue(adminRef, (snapshot) => {
            if (snapshot.exists()) {
                const admins = snapshot.val();
                const found = Object.values(admins).some(admin =>
                    admin.username.toLowerCase() === staffUsername.trim().toLowerCase()
                );

                if (found) {
                    navigation.navigate('ResetSukses');
                } else {
                    Alert.alert('Verifikasi Gagal', 'Username staf tidak ditemukan.');
                }
            } else {
                Alert.alert('Gagal', 'Data admin tidak tersedia.');
            }
        }, { onlyOnce: true });
    };

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#0A3832" />
            <PageHeaderdua />
            <Gap height={170} />

            <View style={styles.popup}>
                <View style={styles.popupContent}>
                    <View style={styles.line} />
                    <Gap height={5} />

                    <Text style={styles.title}>Reset Poin</Text>
                    <Text style={styles.desc}>Silahkan ke kantor Village Dean untuk <Text style={{ color: '#3D0C7D' }}> 
                        approve reset poin!</Text></Text>

                    <TextInput
                        placeholder="Username Staf"
                        placeholderTextColor="#999"
                        value={staffUsername}
                        onChangeText={setStaffUsername}
                        style={styles.input}
                        autoCapitalize="none"
                    />
                    <Gap height={14} />

                    <TouchableOpacity style={styles.button} onPress={handleVerification}>
                        <Text style={styles.buttonText}>Verifikasi</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.contentWrapper}>
                <Gap height={100} />
            </View>
            <Gap height={26} />
        </ScrollView>
    );
};

export default ResetVerification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A3832',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    line: {
        borderWidth: 2,
        borderRadius: 8,
        width: 70,
        borderColor: '#ABABAB',
        alignSelf: 'center',
        marginTop: -5
    },
    popup: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        marginTop: -150
    },
    popupContent: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 12,
        alignItems: 'center',
        width: '80%',
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 25,
        marginBottom: 8,
        color: '#0A3832',
    },
    desc: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
        marginBottom: 12,
        marginVertical: 16
    },
    input: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 6,
        padding: 5,
        marginTop: 8,
        marginBottom: 16,
        fontSize: 14,
        color: '#000',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#0A3832',
        paddingVertical: 10,
        borderRadius: 8,
        width: '100%',
    },

    buttonText: {
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        textAlign: 'center'

    },
    contentWrapper: {
        backgroundColor: 'white',
        width: 400,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: -40,
        opacity: 0.4,
        height: 700,
    },
});
