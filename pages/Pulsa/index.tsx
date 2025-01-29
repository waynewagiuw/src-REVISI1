import { StatusBar, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import React from 'react';
import { Gap, PageHeader, Pulsatukar, Noinput, Buttonproduk } from '../../components';
import Eventpulsa from '../../assets/images/eventpulsa'

const Pulsa = ({ navigation }) => {


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
                    <Eventpulsa width={'100%'} height={'110%'} />
                </View>
                <Gap height={56} />
                <Text style={styles.title}>Pulsa Semua Operator </Text>
                <Pulsatukar />
            </View>
            <Gap height={26} />
            <Noinput
                placeholder={"Masukan Nomor Kontak"} />
            <Gap height={16} />
            <View style={{ marginHorizontal: 24 }}>
                <Buttonproduk
                    backgroundColor='#0A3832'
                    label="Tukar"
                    onPress={() => navigation.navigate('DanaSukses')}
                />
            </View>
            <Gap height={26} />
        </ScrollView>
    );
};

export default Pulsa;

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
