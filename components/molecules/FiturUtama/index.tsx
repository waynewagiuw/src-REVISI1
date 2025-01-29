import React from "react";
import { View, StyleSheet } from 'react-native';
import FiturUtamaSub from "../FiturUtamaSub";

const styles = StyleSheet.create({
    wrapperFiturUtama:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap:'wrap',
    },
});

const FiturUtama = () => {
    return (
        <View style={styles.wrapperFiturUtama}>
            <FiturUtamaSub image={require('../../../assets/icon/shop.jpg')} title="Toko" pageName="Shop" />
            <FiturUtamaSub image={require('../../../assets/icon/misi.jpg')} title="Misi" pageName="Mission" />
            <FiturUtamaSub image={require('../../../assets/icon/doctor.jpg')} title="Edukasi" pageName="Health"/>
        </View>
    );
}

export default FiturUtama;
