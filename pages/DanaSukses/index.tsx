import { StatusBar, ScrollView, StyleSheet, Text, Platform, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Gap, PageHeader, DanatukarLengkap, Noinput, Buttonproduk, PopUpPoinSukses, TukarPoin, PageHeaderdua } from '../../components';
import Checklist from '../../assets/icon/checklist.svg'

const DanaSukses = ({ navigation }) => {


    return (

        <ScrollView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832" />
            <PageHeaderdua />
            <Gap height={170}/>
            <View style={styles.popup}>
                <PopUpPoinSukses
                label={"Berhasil Tukar"}
                    label1={
                        <>
                            Pergi ke riwayat anda lalu tukarkan voucher di
                            <Text style={{ color: '#3D0C7D' }}> Village Dean!</Text>
                            
                        </>
                    }
                    logo={Checklist}
                    onPress={() => navigation.navigate('Shop')} />
            </View>
            <View style={styles.contentWrapper}>
                <Gap height={100}/>
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
        marginTop: -150,
    },
    contentWrapper: {
        backgroundColor: 'white',
        width: 400,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: -40,
        opacity: 0.4,
        height:700
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
