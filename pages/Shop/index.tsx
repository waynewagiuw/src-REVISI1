import { StatusBar, ScrollView, StyleSheet, Text, Platform, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Danatukar, Gap, PageHeader, Produk, TukarPoin } from '../../components';

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
                <Gap height={100}/>
            <TukarPoin/>
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
    
    contentWrapper: {
        backgroundColor: 'white',
        width: 400,
        justifyContent: 'center',
        alignSelf: 'center',
    },

});
