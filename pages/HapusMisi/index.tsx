import { StatusBar, ScrollView, StyleSheet, Text, Platform, View } from 'react-native';
import React from 'react';
import { Buttonproduk, Gap, PageHeaderdua, PageHeadertiga, PopUpHapusMisi, PopUpTerimaMisi, SubMission, SubMissionAdmin } from '../../components';
import CC from '../../assets/images/tesCC.jpg';
import { useNavigation } from '@react-navigation/native';

const HomeAdmin = () => {
    const navigation = useNavigation();

    const handleKirim = () => {
        navigation.navigate('AddMission');
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832" />
            <PageHeadertiga />

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.contentWrapper}>
                    <View style={styles.popup}>
                        <PopUpHapusMisi
                            title="Hapus misi ini?"
                            onPress={() => navigation.navigate('HomeAdmin')} />
                    </View>
                    <Text style={styles.contenttext}>Misi</Text>
                    <SubMissionAdmin
                        imageSource={CC}
                        time="15 menit"
                        task="Bersihkan Halaman"
                        points="+P 5"
                        status="0/1"
                        onImagePress={() => navigation.navigate('MissionDetail')}
                    />
                    <SubMissionAdmin
                        imageSource={CC}
                        time="15 menit"
                        task="Bersihkan Halaman"
                        points="+P 5"
                        status="0/1"
                        onImagePress={() => navigation.navigate('MissionDetail')}
                    />
                    <SubMissionAdmin
                        imageSource={CC}
                        time="15 menit"
                        task="Bersihkan Halaman"
                        points="+P 5"
                        status="0/1"
                        onImagePress={() => navigation.navigate('MissionDetail')}
                    />
                </View>
            </ScrollView>
            <View style={styles.buttonWrapper}>
                <Buttonproduk label="Buat Misi Baru" onPress={handleKirim} backgroundColor='#0A3832' />
            </View>
        </View>
    );
};

export default HomeAdmin;

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
        marginTop: 20,
    },
    contentWrapper: {
        backgroundColor: 'white',
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    popup: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
        height: '130%',
        justifyContent: 'center',
        zIndex: 1,
    },
    scrollViewContent: {
        paddingBottom: 80,
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 20,
        left: '37%',
        transform: [{ translateX: -150 }],
        width: '100%',
        opacity:0.1
    },
});
