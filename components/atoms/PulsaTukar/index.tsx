import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Pulsadua from '../../../assets/images/pulsa2';
import { Buttonproduk } from '..';
import { Jenis } from '../../molecules';
import Gap from '../Gap';
import { useNavigation } from '@react-navigation/native';

const Pulsatukar = () => {
  const [selectedJenis, setSelectedJenis] = useState(null);
  const navigation = useNavigation();

  // Data dinamis jenis
  const jenisData = [
    { id: 1, label: '10k', labelone: '50p' },
    { id: 2, label: '20k', labelone: '100p' },
    { id: 3, label: '50k', labelone: '150p' },
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
            <Pulsadua />
            <View style={{ marginLeft: 10, marginTop: 5 }}>
              <Text style={{ color: 'black', fontSize: 25, fontFamily: 'Poppins-Medium' }}>
                Pulsa
              </Text>
              <Text style={{ color: 'black', fontSize: 12, fontFamily: 'Poppins-Bold', marginTop: -10 }}>
                Tukar Poin dengan Pulsa
              </Text>
            </View>
          </View>
          <Gap height={20} />
        </View>

        <View style={styles.middana}>
          {jenisData.map((item) => (
            <Jenis
              key={item.id}
              label={item.label}
              labelone={item.labelone}
              isSelected={selectedJenis === item.id}
              onPress={() => handlePress(item.id)}
            />
          ))}
        </View>

        <Buttonproduk label="Lihat Semua" onPress={handleDanaPilih} backgroundColor='#F02647'/>
      </View>
    </View>
  );
};

export default Pulsatukar;

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
    backgroundColor: '#F02647',
    borderRadius: 7,
  },
});
