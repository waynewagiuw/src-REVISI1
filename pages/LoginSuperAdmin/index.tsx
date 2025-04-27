import { StatusBar, StyleSheet, Text, View, Platform, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { Button, Gap, TextInput } from '../../components';
import { showMessage } from 'react-native-flash-message';
import Logo from '../../assets/icon/Eco.svg';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../../config/firebase';  

const db = getDatabase(app);

const LoginSuperAdmin = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); // State for password
    const correctPassword = 'vd'; // Static password for all admins

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            Alert.alert('Error', 'Masukkan username dan password!');
            return;
        }
    
        try {
            const adminRef = ref(db, 'admins');
            const snapshot = await get(adminRef);
    
            if (snapshot.exists()) {
                const admins = snapshot.val();
                let isSuperAdmin = false;
    
                for (let uid in admins) {
                    const admin = admins[uid];
                    if (
                        admin.username === username &&
                        password === correctPassword &&
                        admin.role === 'admin'
                    ) {
                        isSuperAdmin = true;
                        break;
                    }
                }
    
                if (isSuperAdmin) {
                    showMessage({
                        message: 'Login Berhasil!',
                        type: 'success',
                    });
                    navigation.navigate('HomeSuper');
                } else {
                    Alert.alert('Error', 'Hanya admin yang dapat masuk!');
                }
            } else {
                Alert.alert('Error', 'Admin tidak ditemukan dalam database!');
            }
        } catch (error) {
            console.error('Error saat login:', error.message);
            Alert.alert('Error', 'Terjadi kesalahan saat login!');
        }
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
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <Gap height={10} />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry // Hide password input
                />
                <Gap height={26} />
                <Button
                    label="Masuk"
                    backgroundColor='#135D66'
                    textColor="#FFFFFF"
                    onPress={handleLogin}
                />
            </View>
        </ScrollView>
    );
};

export default LoginSuperAdmin;

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
});