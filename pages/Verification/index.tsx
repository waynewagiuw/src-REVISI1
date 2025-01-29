import { StatusBar, StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Button, Gap, TextInput, PopUp } from '../../components';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { showMessage } from 'react-native-flash-message';
import Logo from '../../assets/icon/Eco.svg';
import Checklist from '../../assets/icon/checklist.svg'
import { getDatabase, ref, set } from 'firebase/database';

const Verification = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = () => {
        const data = {
            email: email,
            password: password
        };
        console.log('Data yang dimasukkan saat submit:', data);
        const auth = getAuth();
        const db = getDatabase();
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                set(ref(db, 'users/' + user.uid), data);
                showMessage({
                    message: 'Registrasi berhasil, silahkan login',
                    type: 'success',
                });
                navigation.navigate('SignIn');
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
            <View style={styles.popup}>
               <PopUp
               label1="Selamat Datang"
               label2="Selamat, anda berhasil mendaftarkan akun, ayo indahkan
            bumi dan dapatkan poin mu!"
            label3="Login"
            logo={Checklist}
            onPress={() => navigation.navigate('Login')}/>  
            </View>
           
            <ScrollView>
                <View style={styles.header}>
                    <Logo width={50} height={50} marginTop={'60%'} />
                    <Text style={styles.text}>GreenPoint</Text>
                </View>
                

                <View style={styles.contentWrapper}>
                    <Gap height={26} />
                    <View style={styles.line} />
                    <Gap height={10} />
                    <Text style={styles.login}>Login</Text>
                    <Gap height={16} />
                    <TextInput
                        placeholder="Email"
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
                        placeholder="Nama"
                    />
                    <Gap height={26} />
                    <Button
                        label="Daftar"
                        backgroundColor="#0A3832"
                        textColor="#FFFFFF"
                        onPress={onSubmit}
                    />
                    <Gap height={34} />
                    <Text style={styles.snk}>Mulai dari diri sendiri, untuk bumi yang lebih baik.</Text>
                    <Text style={styles.snk}> <Text style={styles.blue}>Mari kita wujudkan!</Text> </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default Verification;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0A3832',
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

    },
    popup: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width:'100%',
        height:'110%',
        justifyContent: 'center',
        zIndex: 100, 
        marginTop:-50

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        opacity:0.4
    },
    text: {
        marginTop: '60%',
        marginLeft: 5,
        fontSize: 26,
        color: 'white',
        fontFamily: 'Poppins-Medium',
        opacity:0.4

    },
    contentWrapper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingHorizontal: 24,
        width: 350,
        height: 600,
        marginTop: 70,
        alignSelf: 'center',
        opacity:0.4

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
