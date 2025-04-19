import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FiturUtamaSub from "../FiturUtamaSub";

const styles = StyleSheet.create({
    wrapperFiturUtama: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        alignContent: 'center',
    },
    fiturItem: {
        width: '45%',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        marginVertical: 20,
        borderRadius: 10,
        alignItems: 'center',
        padding: 10,
        height: '32%',
        elevation: 7,
        marginLeft: 15
    },
});

const FiturUtama = () => {
    const navigation = useNavigation(); 

    return (
        <View style={styles.wrapperFiturUtama}>
            <View style={styles.fiturItem}>
                <FiturUtamaSub
                    image={require('../../../assets/icon/tukar.jpg')}
                    title="Tukar"
                    pageName="Shop"
                    onPress={() => navigation.navigate("Shop")}
                />
            </View>
            
            <View style={styles.fiturItem}>
                <FiturUtamaSub
                    image={require('../../../assets/icon/misi.jpg')}
                    title="Misi"
                    pageName="Mission"
                    onPress={() => navigation.navigate("Mission")}
                />
            </View>
            <View style={styles.fiturItem}>
                <FiturUtamaSub
                    image={require('../../../assets/icon/notifuser.jpg')}
                    title="Notifikasi"
                    pageName="NotificationUser"
                    onPress={() => navigation.navigate("NotificationUser")}
                />
            </View>
            <View style={styles.fiturItem}>
                <FiturUtamaSub
                    image={require('../../../assets/icon/riwayat.jpg')}
                    title="Riwayat"
                    pageName="History"
                    onPress={() => navigation.navigate("History")}
                />
            </View>
        </View>
    );
};

export default FiturUtama;