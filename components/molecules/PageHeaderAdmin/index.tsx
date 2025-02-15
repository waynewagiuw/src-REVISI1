import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Notif from '../../../assets/icon/bel.svg';
import Pic from '../../../assets/icon/profil.svg';
import { useNavigation } from '@react-navigation/native';

const PageHeaderAdmin = () => {
    const navigation = useNavigation();
    const goToNotification = () => {
        navigation.navigate('Notification');
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pic width={40} height={40} marginTop={15} />
                <Text style={styles.Hello}>Jhon <Text style={styles.yellow}>Doe</Text></Text>
                <TouchableOpacity onPress={goToNotification}>
                    <Notif width={30} height={30} marginTop={25} marginLeft={170} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PageHeaderAdmin;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0A3832',
        paddingLeft: 24,
        height: 85,
    },
    header: {
        flexDirection: 'row',
        marginTop: 5
    },
    Hello: {
        fontSize: 20,
        marginTop: 20,
        marginLeft: 15,
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
    },
    yellow: {
        color: '#BBD409',
    },
    poin: {
        height: 30,
        width: 75,
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 20,
        marginLeft: 110
    },
    pointeks: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        color: '#0A3832',
        textAlign: 'center',
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 32,
        marginTop: 70,
        color: 'white',
        textAlign: 'center',
        marginLeft: -20

    }
});
