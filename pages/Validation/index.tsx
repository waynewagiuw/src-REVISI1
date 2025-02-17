import { StatusBar, TouchableOpacity, ScrollView, StyleSheet, Text, Platform, View } from 'react-native';
import React from 'react';
import { Buttonproduk, Detailsubmission, Gap, PageHeader, PageHeaderAdminDua, PageHeaderdua, SubHistory, Uploadpicture, ValidationUploadpicture, } from '../../components';
import Upload from '../../assets/icon/uploadpic.png'
import { useNavigation } from '@react-navigation/native';
import CC from '../../assets/images/tesCC.jpg'

const Validation = () => {
    const navigation = useNavigation();

    const handleKirim = () => {
        navigation.navigate('TerimaSubmit');
    };

    return (
        <ScrollView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832" />
            <PageHeaderAdminDua
            />
            <View style={styles.contentWrapper}>
                <Text style={styles.contenttext}>Validasi</Text>
                <Gap height={36} />
                <ValidationUploadpicture
                    pic={CC}
                    label="foto sebelum   :" />
                <ValidationUploadpicture
                    pic={CC}
                    label="foto diri di lokasi:" />
                <ValidationUploadpicture
                    pic={CC}
                    label="Kirim sesudah  :" />
                <Gap height={16} />
                <Buttonproduk label="Terima" onPress={handleKirim} backgroundColor='#135D66' />
                <Gap height={16} />
                <Buttonproduk label="Tolak" onPress={handleKirim} backgroundColor='#0A3832' />
                <Gap height={66} />
            </View>


        </ScrollView>
    );
};

export default Validation;

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
    },

});
