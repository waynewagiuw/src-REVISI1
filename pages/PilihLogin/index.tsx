import { StatusBar, StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Button, Gap, } from '../../components';
import { showMessage } from 'react-native-flash-message';
import Logo from '../../assets/icon/Eco.svg';

const PilihLogin = ({ navigation }) => {
    const handleAdmin = () => {
        navigation.navigate('LoginAdmin');
    }
    const handleUser = () => {
        navigation.navigate('Login');
    }
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
                <Gap height={66} />

                <Button
                    label="Admin"
                    backgroundColor='#135D66'
                    textColor="#FFFFFF"
                    onPress={() => {
                        console.log("Button pressed! Admin");
                        handleAdmin();
                    }}
                />
                <Gap height={12} />
                <Button
                    label="User"
                    backgroundColor="#0A3832"
                    textColor="#FFFFFF"
                    onPress={() => {
                        console.log("Button pressed! User");
                        handleUser();
                    }}
                />
                <Gap height={64} />
                <Text style={styles.snk}>Dengan GreenPoin, kelola poin Sabath lebih baik!</Text>
                <Text style={styles.blue}>Kumpulkan poin GP, kurangi poin Sabath</Text>

            </View>
        </ScrollView>
    );
};

export default PilihLogin;

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
