import { StatusBar, ScrollView, StyleSheet, Text, Platform, View } from 'react-native';
import React from 'react';
import { Gap, PageHeader, Healthbox, SubMission, SubHistory, PageHeaderdua, SubNotification, PageHeaderAdminDua } from '../../components';
import CC from '../../assets/images/misisatu'
import Box from '../../assets/images/plant'
import Bersih from '../../assets/images/bersih'
import Poinsatu from '../../assets/icon/poinsatu'
import Eco from '../../assets/icon/ecohijau';

const Notification = () => {

    return (
        <ScrollView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832" />
            <PageHeaderAdminDua/>
            <View style={styles.contentWrapper}>
                <Text style={styles.contenttext}>Notifikasi</Text>
                <SubNotification
                    name="Einstein, Albert"
                    date="30 Oktober 2024"
                />
                <Gap height={16} />
                <SubNotification
                    name="Uzumaki, Naruto"
                    date="30 Oktober 2024"
                />
                <Gap height={16} />
                <SubNotification
                    name="Wagiuw, Wayne Gilbert"
                    date="30 Oktober 2024"
                />
            </View>


        </ScrollView>
    );
};

export default Notification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor : 'white'
    },
    contenttext: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: 'black',
        marginLeft: 40,
        marginTop: 20
    },
    contentWrapper: {
        backgroundColor: 'white',
        width: 400,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    event: {
        marginHorizontal: 26,
        height: 180,
        marginTop: 10,
        backgroundColor: '#00A652',
        borderRadius: 7,
    },
    eventbawah: {
        flexDirection: 'row',
    },
    eventtiga: {
        marginHorizontal: 26,
        height: 250,
        width: '42%',
        marginTop: -305,
        backgroundColor: '#F4ECDA',
        borderRadius: 14,
    },
    eventempat: {
        marginHorizontal: 26,
        height: 250,
        width: '42%',
        marginLeft: -12,
        marginTop: -305,
        backgroundColor: '#D8F6F8',
        borderRadius: 14,
    },
    poinimage: {
        width: 15,
        height: 15
    },
    pointext: {
        marginTop: 27,
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        marginLeft: 10
    },
    pointextname: {
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        color: 'Black',
    },
    pointextpoin: {
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        color: '#FFC700',

    },
});
