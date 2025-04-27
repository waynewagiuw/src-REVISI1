import { StatusBar, ScrollView, StyleSheet, Text, Platform, View } from 'react-native';
import React from 'react';
import { Gap, PageHeaderdua, PopUpPoinSukses } from '../../components';

const DanaSukses = ({ navigation, route }) => {
    // Destructure the points from route parameters
    const { pointsRequested, vouchersToAdd } = route.params;

    return (
        <ScrollView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832" />
            <PageHeaderdua />
            <Gap height={170} />
            <View style={styles.popup}>
                <PopUpPoinSukses
                    label={"Tukar Poin"}
                    label1={
                        <>
                            Anda telah menukar {pointsRequested} poin GP untuk {vouchersToAdd} poin Sabat
                            <Text style={{ color: '#3D0C7D' }}> Silahkan cek Riwayat!</Text>
                        </>
                    }
                    onPress={() => navigation.navigate('Shop')} />
            </View>
            <View style={styles.contentWrapper}>
                <Gap height={100} />
            </View>
            <Gap height={26} />
        </ScrollView>
    );
};

export default DanaSukses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A3832',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    popup: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        zIndex: 100,
        marginTop: -150,
    },
    contentWrapper: {
        backgroundColor: 'white',
        width: 400,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: -40,
        opacity: 0.4,
        height: 700,
    },
});
