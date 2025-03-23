import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, Platform, Alert, ScrollView } from 'react-native';
import { Button, Gap, TextInput } from '../../components';
import { showMessage } from 'react-native-flash-message';
import Logo from '../../assets/icon/Eco.svg';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [name, setName] = useState('');

    const onSubmit = () => {
        if (!email.trim() || !password.trim() || !verifyPassword.trim() || !name.trim()) {
            Alert.alert('Peringatan', 'Semua kolom harus diisi!');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Peringatan', 'Password harus minimal 6 karakter!');
            return;
        }

        if (password !== verifyPassword) {
            Alert.alert('Peringatan', 'Password dan verifikasi password tidak cocok!');
            return;
        }

        const auth = getAuth();
        const db = getDatabase();

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;

                // Simpan data user ke Firebase Realtime Database
                set(ref(db, 'users/' + user.uid), {
                    username: name,
                    email: email,
                    userpoints: 0,
                    vouchers: 0,
                })
                .then(() => {
                    console.log('User registered:', user);

                    Alert.alert('Sukses', 'Registrasi berhasil! Silakan login.');
                    navigation.navigate('Verification');
                })
                .catch((error) => {
                    console.error('Error saving user data:', error);
                    Alert.alert('Error', 'Terjadi kesalahan saat menyimpan data pengguna.');
                });
            })
            .catch(error => {
                Alert.alert('Error', error.message);
            });
    };

    return (
        <ScrollView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832" />
            <View style={styles.header}>
                <Logo width={50} height={50} marginTop={'28%'} />
                <Text style={styles.text}>GreenPoin</Text>
            </View>
            <View style={styles.contentWrapper}>
                <Gap height={26} />
                <View style={styles.line} />
                <Gap height={10} />
                <Text style={styles.login}>Sign In</Text>
                <Gap height={16} />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Gap height={8} />
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Gap height={8} />
                <TextInput
                    placeholder="Verifikasi Password"
                    secureTextEntry={true}
                    value={verifyPassword}
                    onChangeText={(text) => setVerifyPassword(text)}
                />
                <Gap height={8} />
                <TextInput
                    placeholder="Nama"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Gap height={26} />
                <Button
                    label="Daftar"
                    backgroundColor="#0A3832"
                    textColor="#FFFFFF"
                    onPress={onSubmit}
                />
                <Gap height={34} />
            </View>
        </ScrollView>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0A3832',
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginTop: '30%',
        marginLeft: 5,
        fontSize: 26,
        color: 'white',
        fontFamily: 'Poppins-Medium',
    },
    contentWrapper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingHorizontal: 24,
        width: 350,
        height: 500,
        marginTop: 40,
        alignSelf: 'center',
    },
    line: {
        borderWidth: 2,
        borderRadius: 8,
        width: 70,
        borderColor: '#ABABAB',
        alignSelf: 'center',
    },
    login: {
        fontSize: 26,
        alignSelf: 'center',
        fontFamily: 'Poppins-Medium',
        color: 'black',
        fontWeight: 'bold'
    },
});
