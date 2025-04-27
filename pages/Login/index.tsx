import { Alert, StatusBar, StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Button, Gap, TextInput } from '../../components';
import { showMessage } from 'react-native-flash-message';
import Logo from '../../assets/icon/Eco.svg';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../config/firebase';
import { sendPasswordResetEmail } from "firebase/auth";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Masukkan email dan password!');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                showMessage({
                    message: 'Login Berhasil!',
                    type: 'success',
                });
                navigation.navigate('Home');
            })
            .catch(error => {
                let errorMessage = 'Login gagal. Cek kembali email atau password Anda!';

                if (error.code === 'auth/invalid-email') {
                    errorMessage = 'Format email tidak valid!';
                } else if (error.code === 'auth/user-not-found') {
                    errorMessage = 'Email tidak ditemukan!';
                } else if (error.code === 'auth/wrong-password') {
                    errorMessage = 'Password salah!';
                }

                Alert.alert('Error', errorMessage);
            });
    };

    const handleForgotPassword = () => {
        if (!email.trim()) {
            Alert.alert('Peringatan', 'Masukkan email terlebih dahulu!');
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert('Berhasil', 'Email untuk reset password telah dikirim!');
            })
            .catch(error => {
                let message = 'Terjadi kesalahan.';

                if (error.code === 'auth/user-not-found') {
                    message = 'Email tidak ditemukan!';
                } else if (error.code === 'auth/invalid-email') {
                    message = 'Format email tidak valid!';
                }

                Alert.alert('Error', message);
            });
    };

    return (
        <ScrollView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832" />
            <View style={styles.header}>
                <Logo width={50} height={50} marginTop={'68%'} />
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
                <Gap height={26} />
                <Button
                    label="Sign In"
                    backgroundColor="#135D66"
                    textColor="#FFFFFF"
                    onPress={handleLogin}
                />
                <Gap height={12} />
                <Button
                    label="Sign Up"
                    backgroundColor="#0A3832"
                    textColor="#FFFFFF"
                    onPress={() => navigation.navigate('SignIn')}
                />
                <Gap height={34} />
                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.snk}>Lupa Password</Text>
                </TouchableOpacity>

            </View>

        </ScrollView>
    );
};

export default Login;


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
    snk: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        textAlign: 'center',
        color: '#3D0C7D',
    },
    text: {
        marginTop: '70%',
        marginLeft: 5,
        fontSize: 26,
        color: 'white',
        fontFamily: 'Poppins-Medium',
    },
    contentWrapper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingHorizontal: 24,
        width: 300,
        height: 400,
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
        fontWeight: 'bold',
    },
    blue: {
        color: '#201658',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontFamily: 'Poppins-Medium',
        fontSize: 11,
        textAlign: 'center',
    },
});
