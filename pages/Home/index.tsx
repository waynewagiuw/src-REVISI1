import { StatusBar, ScrollView, StyleSheet, Text, Platform, View } from 'react-native';
import React from 'react';
import { Gap, PageHeader, FiturUtama } from '../../components';
import Challange from '../../assets/images/challange'
import Event from '../../assets/images/eventdua'
import CC from '../../assets/images/cc'
import Box from '../../assets/images/box'

const Home = ({ navigation }) => {

    return (
        <ScrollView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832" />
            <PageHeader
            />
            <View style={styles.fitur}>
                <FiturUtama />
            </View>
            <Gap height={56} />
            <Text style={styles.title}> Ikuti event menarik </Text>
            <View style={styles.eventbawah}>
                <View style={styles.eventtiga}>
                    <CC width={'100%'} height={'100%'} />
                </View>
                <Gap height={16} />
                <View style={styles.eventempat}>
                    <Box width={'100%'} height={'100%'} />
                </View>
            </View>
            <Gap height={46} />
            <Text style={styles.title}> Tentang Kami </Text>
            <View style={styles.eventbawah}>
                <View style={styles.eventtiga}>
                    <CC width={'100%'} height={'100%'} />
                </View>
                <Gap height={16} />
                <View style={styles.eventempat}>
                    <Box width={'100%'} height={'100%'} />
                </View>
            </View>
            <Gap height={46} />
            <Text style={styles.title}> Tips Untuk Kamu! </Text>
            <View style={styles.eventbawah}>
                <View style={styles.eventtiga}>
                    <CC width={'100%'} height={'100%'} />
                </View>
                <Gap height={16} />
                <View style={styles.eventempat}>
                    <Box width={'100%'} height={'100%'} />
                </View>
            </View>
        </ScrollView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

    },
    fitur: {
        marginHorizontal: 18,
        height: 100,
        marginTop: -50,
        backgroundColor: 'white',
        elevation: 7,
        borderRadius: 10,
    },
    title: {
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        marginHorizontal: 18,
        color: 'black'
    },
    event: {
        marginHorizontal: 26,
        height: 130,
        marginTop: 5,
        backgroundColor: '#0B6E4F',
        borderRadius: 10,
    },
    eventbawah: {
        flexDirection: 'row'
    },
    eventdua: {
        marginHorizontal: 26,
        height: 80,
        marginTop: 5,
        backgroundColor: '#F0F5F9',
        borderRadius: 10,
    },
    eventtiga: {
        marginHorizontal: 26,
        height: 170,
        width: '41%',
        marginTop: 5,
        backgroundColor: '#56C9A0',
        borderRadius: 8,
    },
    eventempat: {
        marginHorizontal: 20,
        height: 170,
        width: '41%',
        marginLeft: -8,
        marginTop: 5,
        backgroundColor: '#48D7E4',
        borderRadius: 7
    },
});
