import React from "react";
import { View, StyleSheet } from 'react-native';
import ProdukSub from "../ProdukSub";

const styles = StyleSheet.create({
    wrapperFiturUtama:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap:'wrap',
        width:'100%',
    },
});

const Produk = () => {
    return (
        <View style={styles.wrapperFiturUtama}>
            <ProdukSub image={require('../../../assets/icon/pulsa.jpg')} title="Pulsa" pageName="Pulsa"/>
            <ProdukSub image={require('../../../assets/icon/dana.jpg')} title="DANA" pageName="Dana" />
            <ProdukSub image={require('../../../assets/icon/gopay.jpg')} title="GoPay" pageName="Gopay" />
            <ProdukSub image={require('../../../assets/icon/ovo.jpg')} title="OVO" pageName="Ovo" />
            <ProdukSub image={require('../../../assets/icon/linkaja.jpg')} title="LinkAja!" pageName="Linkaja"/>
            <ProdukSub image={require('../../../assets/icon/seabank.jpg')} title="SeaBank" pageName="Seabank" />
            <ProdukSub image={require('../../../assets/icon/voucher.jpg')} title="Voucher" pageName="Voucher" />
            <ProdukSub image={require('../../../assets/icon/more.jpg')} title="More" />
        </View>
    );
}

export default Produk;
