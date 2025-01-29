import { StatusBar, StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Button, Gap, TextInput } from '../../components';  
import { showMessage } from 'react-native-flash-message';
import Logo from '../../assets/icon/Eco.svg';

const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [name, setName] = useState('');

    const onSubmit = () => {
        console.log('Email:', email);
        console.log('Password:', password);  
        console.log('Verifikasi Password:', verifyPassword);  
        console.log('Nama:', name);

        if (email && password && verifyPassword && name) {
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

            showMessage({
                message: 'Registrasi berhasil, silahkan login',
                type: 'success',
            });

            navigation.navigate('Verification');
        } else {
            showMessage({
                message: 'Semua kolom harus diisi',
                type: 'danger',
            });
        }
    };

    return (
        <ScrollView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832" />
            <View style={styles.header}>
                <Logo width={50} height={50} marginTop={'28%'}/>
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
                    placeholder="Verifikasi Pasword"
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

