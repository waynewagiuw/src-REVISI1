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
                    image={require('../../../assets/icon/supervisors.jpg')}
                    title="Daftar Supervisor"
                    pageName="Shop"
                    onPress={() => navigation.navigate("ListStaf")}
                />
            </View>
            
            <View style={styles.fiturItem}>
                <FiturUtamaSub
                    image={require('../../../assets/icon/poinmahasiswa.jpg')}
                    title="Daftar Poin Mahasiswa"
                    pageName="Mission"
                    onPress={() => navigation.navigate("ListPoin")}
                />
            </View>
            <View style={styles.fiturItem}>
                <FiturUtamaSub
                    image={require('../../../assets/icon/approval.jpg')}
                    title="Verifikasi Penukaran"
                    pageName="NotificationUser"
                    onPress={() => navigation.navigate("PermintaanUser")}
                />
            </View>
            <View style={styles.fiturItem}>
                <FiturUtamaSub
                    image={require('../../../assets/icon/misi.jpg')}
                    title="Daftar Misi"
                    pageName="History"
                    onPress={() => navigation.navigate("MissionAdmin")}
                />
            </View>
        </View>
    );
};

export default FiturUtama;