import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Danadua from '../../../assets/images/dana2';
import { Buttonproduk } from '..';
import { Jenis } from '../../molecules';
import Gap from '../Gap';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const DanatukarLengkap = () => {
  const [selectedJenis, setSelectedJenis] = useState(null);
  const navigation = useNavigation();

  const handlePress = (index) => {
    setSelectedJenis(index);
  };

  const handleDana = () => {
    navigation.navigate('Dana');
  };

  const jenisData = [
    { id: 1, label: '1k', labelone: '6p' },
    { id: 2, label: '2k', labelone: '12p' },
    { id: 3, label: '5k', labelone: '25p' },
    { id: 4, label: '10k', labelone: '50p' },
    { id: 5, label: '15k', labelone: '75p' },
    { id: 6, label: '20k', labelone: '10p' },
    { id: 7, label: '25k', labelone: '125p' },
    { id: 8, label: '50k', labelone: '150p' },
    { id: 9, label: '100k', labelone: '200p' },
  ];

  return (
    <ScrollView style={styles.tukar}>
      <View style={styles.contentwrapper}>
        <View style={styles.titledana}>
          <View style={styles.header}>
            <Danadua />
            <View style={{ marginLeft: 10, marginTop: 5 }}>
              <Text style={{ color: 'black', fontSize: 25, fontFamily: 'Poppins-Medium' }}>
                DANA
              </Text>
              <Text style={{ color: 'black', fontSize: 12, fontFamily: 'Poppins-Bold', marginTop: -10 }}>
                Tukar Poin dengan Dana
              </Text>
            </View>
          </View>
          <Gap height={20} />
        </View>

        <View style={styles.grid}>
          {jenisData.map((item, index) => (
            <View key={item.id} style={styles.gridItem}>
              <Jenis
                label={item.label}
                labelone={item.labelone}
                isSelected={selectedJenis === item.id}
                onPress={() => handlePress(item.id)}
              />
            </View>
          ))}
        </View>
        <Gap height={10} />

        <Buttonproduk label="Oke" onPress={handleDana} />

      </View>
    </ScrollView>
  );
};

export default DanatukarLengkap;

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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop:30,
  },
  gridItem: {
    width: '30%',
    marginBottom: 10,
    alignItems:'center'
  },
  tukar: {
    marginHorizontal: 24,
    marginTop: 5,
    backgroundColor: '#0472D7',
    borderRadius: 7,
  },
});
