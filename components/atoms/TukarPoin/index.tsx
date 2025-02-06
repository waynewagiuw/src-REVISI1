import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Buttonproduk } from '..';
import { Jenis } from '../../molecules';
import Gap from '../Gap';
import { useNavigation } from '@react-navigation/native';

const TukarPoin = () => {
  const [selectedJenis, setSelectedJenis] = useState(null);
  const navigation = useNavigation();

  // Data dinamis jenis
  const jenisData = [
    { id: 1, label: '2', labelone: '6p' },
    { id: 2, label: '4', labelone: '12p' },
    { id: 3, label: '6', labelone: '25p' },
  ];

  const handlePress = (index) => {
    setSelectedJenis(index);
  };

  const handleTukar = () => {
    navigation.navigate('DanaSukses');
  };

  return (
    <View style={styles.tukar}>
      <View style={styles.contentwrapper}>
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

        <Buttonproduk width='100%' label="Tukar" onPress={handleTukar} backgroundColor='#0A3832'/>
      </View>
    </View>
  );
};

export default TukarPoin;

const styles = StyleSheet.create({
  contentwrapper: {
    marginVertical: 35,
    marginHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middana: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
    marginTop:-10
  },
  tukar: {
    marginHorizontal: 24,
    marginTop: 5,
    backgroundColor: '#0A3832',
    borderRadius: 7,
  },
});
