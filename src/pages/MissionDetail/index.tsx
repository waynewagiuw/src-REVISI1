import { StatusBar, TouchableOpacity, ScrollView, StyleSheet, Text, Platform, View } from 'react-native';
import React from 'react';
import { Detailsubmission, Gap, PageHeader, PageHeaderdua, SubHistory, } from '../../components';
import CC from '../../assets/images/tesCC.jpg'

const MissionDetail = ({navigation}) => {


    return (
        <ScrollView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832" />
            <PageHeaderdua
            />
            <View style={styles.contentWrapper}>
                <Text style={styles.contenttext}>Detail Misi</Text>
                <Detailsubmission
                    task="Angkat barang"
                    time="60 menit"
                    poin="20"
                    slot="5 orang"
                    loc="GA-201"
                    desc="Angkat semua kursi ke GK1 Lobby"
                    pic={CC}
                    onPress={() => navigation.navigate('TerimaMisi')}

                // task, time, poin, slot, loc, desc, pic,
                />
            </View>


        </ScrollView>
    );
};

export default MissionDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
        marginTop: -100
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
