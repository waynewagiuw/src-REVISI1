import { StatusBar, StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Button, Gap, TextInput } from '../../components';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { showMessage } from 'react-native-flash-message';
import Logo from '../../assets/icon/Eco.svg';
import { getDatabase, ref, set } from 'firebase/database';

const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = () => {
        const data = {
            email: email,
            password: password,
        }
        console.log('Data yang dimasukkan saat submit:', data);
        const auth = getAuth();
        const db = getDatabase();
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                set(ref(db, 'users/' + user.uid), data);
                showMessage({
                    message: 'Registasi berhasil, silahkan login',
                    type: 'success',
                });
                navigation.navigate('Login');
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
        <ScrollView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832" />
            <View style={styles.header}>
                <Logo width={50} height={50} marginTop={'28%'}
                />
                <Text style={styles.text}>GreenPoin</Text>
            </View>
            <View style={styles.contentWrapper}>
                <Gap height={26} />
                <View style={styles.line} />
                <Gap height={10} />
                <Text style={styles.login}>SignIn</Text>
                <Gap height={16} />
                <TextInput
                    placeholder={"Email"}
                    value={email}
                    onChangeText={value => setEmail(value)}
                />
                <Gap height={8} />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={value => setPassword(value)}
                    secureTextEntry={true}
                />
                <TextInput
                    placeholder="Verifikasi Password"
                />
                <TextInput
                    placeholder="Nama"
                />
                <Gap height={26} />
                <Button
                    label="Daftar"
                    backgroundColor="#0A3832"
                    textColor="#FFFFFF"
                    onPress={() => navigation.navigate('Verification')}
                />
                <Gap height={34} />
            </View>
        </ScrollView >
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
        height: 400,
        marginTop :40,
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
    snk: {
        fontFamily: 'Poppins-Medium',
        fontSize: 11,
        textAlign: 'center',
        color: 'black',
        marginBottom: -3
    },
    blue: {
        color: '#201658',
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    }
});
