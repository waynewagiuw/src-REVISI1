import { StatusBar, ScrollView, StyleSheet, Text, Platform, View } from 'react-native';
import React from 'react';
import { Gap, PageHeader, Healthbox, SubMission, SubHistory, PageHeaderdua, Buttonproduk } from '../../components';
import CC from '../../assets/images/misisatu'
import Box from '../../assets/images/plant'
import Bersih from '../../assets/images/bersih'
import Poinsatu from '../../assets/icon/poinsatu'
import Eco from '../../assets/icon/ecohijau';
import { useNavigation } from '@react-navigation/native';

const History = () => {
    const navigation = useNavigation();

    const handleTukar = () => {
        navigation.navigate('DanaSukses');
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832" />
            <PageHeaderdua />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.contentWrapper}>
                    <Text style={styles.contenttext}>Riwayat</Text>
                    <SubHistory
                        points={2}
                        date="30 Oktober 2024"
                    />
                    <SubHistory
                        points={2}
                        date="30 Oktober 2024"
                    />
                    <SubHistory
                        points={2}
                        date="30 Oktober 2024"
                    />
                    <SubHistory
                        points={2}
                        date="30 Oktober 2024"
                    /><SubHistory
                        points={2}
                        date="30 Oktober 2024"
                    /><SubHistory
                        points={2}
                        date="30 Oktober 2024"
                    /><SubHistory
                        points={2}
                        date="30 Oktober 2024"
                    />
                </View>
            </ScrollView>
            <View style={styles.buttonWrapper}>
                <Buttonproduk width='80%' label="Reset" onPress={handleTukar} backgroundColor='#0A3832' />
            </View>
        </View>
    );
};

export default History;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white'
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 20, left: '37%',
        transform: [{ translateX: -150 }],
        width: '100%',
        zIndex: 1
    },
    scrollViewContent: {
        paddingBottom: 80
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
