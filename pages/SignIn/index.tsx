import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, Platform } from 'react-native';
import { Button, Gap, TextInput } from '../../components';
import { showMessage } from 'react-native-flash-message';
import Logo from '../../assets/icon/Eco.svg';
import { getDatabase, ref, set, update, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [name, setName] = useState('');

    const onSubmit = () => {
        if (!email || !password || !verifyPassword || !name) {
            showMessage({
                message: 'Semua kolom harus diisi',
                type: 'danger',
            });
            return;
        }

        if (password.length < 6) {
            showMessage({
                message: 'Password harus minimal 6 karakter',
                type: 'danger',
            });
            return;
        }

        if (password !== verifyPassword) {
            showMessage({
                message: 'Password dan verifikasi password tidak cocok',
                type: 'danger',
            });
            return;
        }

        const auth = getAuth();
        const db = getDatabase();

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;

                // Set user data in Firebase Realtime Database
                set(ref(db, 'users/' + user.uid), {
                    username: name,
                    email: email,
                    userpoints: 0,
                    vouchers: 0,
                })
                .then(() => {
                    console.log('User registered:', user);

                    // Debugging: Read data back from Firebase
                    const userRef = ref(db, 'users/' + user.uid);
                    onValue(userRef, (snapshot) => {
                        if (snapshot.exists()) {
                            console.log('User data from Firebase:', snapshot.val());
                        } else {
                            console.log('No data available');
                        }
                    });

                    showMessage({
                        message: 'Registrasi berhasil, silahkan login',
                        type: 'success',
                    });
                    navigation.navigate('Verification');
                })
                .catch((error) => {
                    console.error('Error saving user data:', error);
                    showMessage({
                        message: 'Terjadi kesalahan saat menyimpan data pengguna',
                        type: 'danger',
                    });
                });
            })
            .catch(error => {
                const errorMessage = error.message;
                showMessage({
                    message: errorMessage,
                    type: 'danger',
                });
            });
    };

    return (
        <View style={styles.container}>
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
                <Text style={styles.login}>SignIn</Text>
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
                    placeholder="Nama SIU"
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
        </View>
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