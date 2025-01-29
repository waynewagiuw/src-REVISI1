import { StatusBar, ScrollView, StyleSheet, Text, TouchableOpacity, Platform, View } from 'react-native';
import React from 'react';
import { Gap, PageHeader, DanatukarLengkap, Noinput, Buttonproduk } from '../../components';
import Eventdana from '../../assets/images/eventdana'

const DanaPilih = ({ navigation }) => {


    return (
        <ScrollView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832" />
            <PageHeader
            />
            <View style={styles.contentWrapper}>
                <View style={styles.event}>
                    <Eventdana width={'100%'} height={'110%'} marginTop={-10} />
                </View>
                <Gap height={56} />
                <Text style={styles.title}>Uang Digital </Text>
                <DanatukarLengkap />
            </View>
            <Gap height={26} />
        </ScrollView>
    );
};

export default DanaPilih;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

    },
    contentWrapper: {
        backgroundColor: 'white',
        width: 400,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: -40,
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        marginHorizontal: 18,
        color: 'black'
    },
    event: {
        marginHorizontal: 18,
        height: 115,
        marginTop: -60,
        borderRadius: 10,
    },
    tukar: {
        marginHorizontal: 26,
        height: 340,
        marginTop: 5,
        backgroundColor: '#0472D7',
        borderRadius: 7,
    },


});
