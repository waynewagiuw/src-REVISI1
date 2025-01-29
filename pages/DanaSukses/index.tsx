import { StatusBar, ScrollView, StyleSheet, Text, Platform, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Gap, PageHeader, DanatukarLengkap, Noinput, Buttonproduk, PopUpPoinSukses } from '../../components';
import Eventdana from '../../assets/images/eventdana'
import Checklist from '../../assets/icon/checklist.svg'

const DanaSukses = ({ navigation }) => {


    return (

        <ScrollView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832" />
            <PageHeader />
            <View style={styles.popup}>
                <PopUpPoinSukses
                    label1={
                        <>
                            Selamat! saldo dana sebesar{' '}
                            <Text style={{ color: '#3D0C7D' }}>RP100.000</Text>.{'\n'}
                            telah masuk ke akun Dana anda.
                        </>
                    }
                    logo={Checklist}
                    onPress={() => navigation.navigate('Dana')} />
            </View>
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

export default DanaSukses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A3832',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    popup: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        zIndex: 100,
        marginTop: -50,
    },
    contentWrapper: {
        backgroundColor: 'white',
        width: 400,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: -40,
        opacity: 0.4
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        marginHorizontal: 18,
        color: 'black',
        opacity: 0.4
    },
    event: {
        marginHorizontal: 18,
        height: 115,
        marginTop: -60,
        borderRadius: 10,
        opacity: 0.4
    },
    tukar: {
        marginHorizontal: 26,
        height: 340,
        marginTop: 5,
        backgroundColor: '#0472D7',
        borderRadius: 7,
        opacity: 0.4
    },


});
