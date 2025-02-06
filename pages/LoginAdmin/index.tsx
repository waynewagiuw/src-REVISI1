import { StatusBar, StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Button, Gap, TextInput } from '../../components';
import { showMessage } from 'react-native-flash-message';
import Logo from '../../assets/icon/Eco.svg';

const LoginAdmin = ({ navigation }) => {
    const [username, setUsername] = useState('');

    const handleLogin = () => {
        console.log('Username:', username);

        if (username) {
            showMessage({
                message: 'Login Successful',
                type: 'success',
            });
            navigation.navigate('HomeAdmin');
        } else {
            showMessage({
                message: 'Username are required',
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
                <Logo width={50} height={50} marginTop={'68%'} />
                <Text style={styles.text}>GreenPoin</Text>
            </View>
            <View style={styles.contentWrapper}>
                <Gap height={26} />
                <View style={styles.line} />
                <Gap height={10} />
                <Text style={styles.login}>SignIn</Text>
                <Gap height={16} />
                <TextInput
                    placeholder={"Username"}
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                
                <Gap height={26} />
                <Button
                    label="Masuk"
                    backgroundColor='#135D66'
                    textColor="#FFFFFF"
                    onPress={() => {
                        console.log("Button pressed!");
                        handleLogin();
                    }}
                />
                <Gap height={34} />
               
            </View>
        </ScrollView>
    );
};

export default LoginAdmin;

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
        width: 350,
        height: 600,
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
    snk: {
        fontFamily: 'Poppins-Medium',
        fontSize: 11,
        textAlign: 'center',
        color: 'black',
        marginBottom: -3,
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
