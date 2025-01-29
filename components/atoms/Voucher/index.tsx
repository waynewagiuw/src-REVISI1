import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Voucherdua from '../../../assets/images/voucher2';
import { Buttonproduk } from '..';
import { Jenisdua } from '../../molecules';
import Gap from '../Gap';
import { useNavigation } from '@react-navigation/native';
import imagesatu from '../../../assets/icon/ovo.jpg';

const Vouchertukar = () => {
  const [selectedJenis, setSelectedJenis] = useState(null);
  const navigation = useNavigation();

  // Data dinamis jenis
  const jenisData = [
    { id: 1, image: imagesatu},
    { id: 2, image: imagesatu},
  ];

  const handlePress = (index) => {
    setSelectedJenis(index);
  };

  const handleDanaPilih = () => {
    navigation.navigate('DanaPilih');
  };

  return (
    <View style={styles.tukar}>
      <View style={styles.contentwrapper}>
        <View style={styles.titledana}>
          <View style={styles.header}>
            <Voucherdua />
            <View style={{ marginLeft: 10, marginTop: 5 }}>
              <Text style={{ color: 'black', fontSize: 25, fontFamily: 'Poppins-Medium' }}>
              Voucher
              </Text>
              <Text style={{ color: 'black', fontSize: 12, fontFamily: 'Poppins-Bold', marginTop: -10 }}>
                Tukar Poin dengan Voucher
              </Text>
            </View>
          </View>
          <Gap height={20} />
        </View>

        <View style={styles.middana}>
          {jenisData.map((item) => (
            <Jenisdua
              key={item.id}
              image={item.image}
              isSelected={selectedJenis === item.id}
              onPress={() => handlePress(item.id)}
            />
          ))}
        </View>

        <Buttonproduk
          label="Lihat Semua"
          onPress={handleDanaPilih}
          backgroundColor='#524E4E' />
      </View>
    </View>
  );
};

export default Vouchertukar;

const styles = StyleSheet.create({
  contentwrapper: {
    marginVertical: 35,
    marginHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titledana: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  middana: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  tukar: {
    marginHorizontal: 24,
    marginTop: 5,
    backgroundColor: '#524E4E',
    borderRadius: 7,
  },
});
