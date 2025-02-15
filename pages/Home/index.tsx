import { StatusBar, ScrollView, StyleSheet, Text, Platform, View } from 'react-native';
import React from 'react';
import { Gap, PageHeader, FiturUtama } from '../../components';

const Home = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832" />
            <PageHeader
            />
            <View style={styles.fitur}>
                <FiturUtama />
                <Gap height={56} />
            </View>
        </View>
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
        marginTop: 70,
        backgroundColor: 'white',
        elevation: 7,
        borderRadius: 10,
    },
    
});
