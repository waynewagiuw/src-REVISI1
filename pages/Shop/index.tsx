import { StatusBar, ScrollView, StyleSheet, Text, Platform, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Gap, PageHeader, Produk } from '../../components';
import Reward from '../../assets/images/extra';


const Shop = ({navigation}) => {


    return (
        <ScrollView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832" />
            <PageHeader
            />
            <View style={styles.contentWrapper}>
            <Text style={styles.contenttext}>Tukar Poin</Text>
            <Gap height={10} />

                <View style={styles.produk}>
                    <Produk />
                </View>
                <Gap height={46} />
                <Text style={styles.title}>Hadiah Spesial </Text>
                <View style={styles.event}>
                    <Reward width={'100%'} height={'100%'} />
                </View>
            </View>
        </ScrollView>
    );
};

export default Shop;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    content: {
        backgroundColor: 'white',
        width: '46%',
        borderRadius: 12,
        height: 55,
        marginLeft: 10,
        marginTop: -80,
        paddingHorizontal: 24,
    },
    contentdua: {
        backgroundColor: '#8DB596',
        width: '46%',
        borderRadius: 12,
        height: 55,
        marginLeft: 10,
        marginTop: -55,
        paddingHorizontal: 24,
        alignSelf: 'flex-end',
        marginRight: 10,
    },

    contenttext: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: 'black',
        marginLeft: 40,
        marginTop:30,
    },
    contentWrapper: {
        backgroundColor: 'white',
        width: 400,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: -100
    },

    title: {
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        marginHorizontal: 18,
        color: 'black'
    },
    event: {
        marginHorizontal: 26,
        height: 300,
        marginTop: 5,
        backgroundColor: '#01427A',
        borderRadius: 7,
    },
    produk: {
        marginHorizontal: 18,
        height: 200,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 10,
    },
});
