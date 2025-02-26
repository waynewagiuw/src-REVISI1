import { StatusBar, TouchableOpacity, ScrollView, StyleSheet, Text, Platform, View } from 'react-native';
import React from 'react';
import { Buttonproduk, Detailsubmission, Gap, PageHeader, PageHeaderdua, PopUpMisiSukses, PopUpSubmitMisi, PopUpTerimaMisi, SubHistory, Uploadpicture, } from '../../components';
import Upload from '../../assets/icon/uploadpic.png'
import { useNavigation } from '@react-navigation/native';
import Checklist from '../../assets/icon/checklist.svg'


const TerimaSubmit = () => {
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
            <PageHeaderdua
            />
            <View style={styles.contentWrapper}>
            <View style={styles.popup}>
            <PopUpMisiSukses
            label={"Berhasil Submit"}
                    label1={
                        <>
                            Silahkan menunggu beberapa saat! 
                            <Text style={{ color: '#3D0C7D' }}> Menunggu validasi staf</Text>
                            
                        </>
                    }
                    logo={Checklist}
                    onPress={() => navigation.navigate('Mission')} />
            </View>
                <Text style={styles.contenttext}>Submit Misi</Text>
                <Gap height={36}/>
                <Uploadpicture
                    pic={Upload}
                    label="Kirim foto sebelum   :" />
                <Uploadpicture
                    pic={Upload}
                    label="Kirim foto sebelum   :" />
                <Uploadpicture
                    pic={Upload}
                    label="Kirim foto sebelum   :" />
                    <Gap height={16}/>
                <Buttonproduk label="Kirim" onPress={handleKirim} backgroundColor='#0A3832' />
                <Gap height={80}/>

            </View>


        </ScrollView>
    );
};

export default TerimaSubmit;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    popup: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
        height: '130%',
        justifyContent: 'center',
        zIndex:1,
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
