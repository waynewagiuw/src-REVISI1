import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Gap from '../Gap';
import { Buttonproduk } from '..';

const Detailsubmission = ({ task, time, poin, slot, loc, desc, pic, onPress }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Tugas    : <Text>{task}</Text>
            </Text>
            <Text style={styles.text}>
                Waktu    : <Text>{time}</Text>
            </Text>
            <Text style={styles.text}>
                Poin       : <Text>{poin}</Text>
            </Text>
            <Text style={styles.text}>
                Kuota     : <Text>{slot}</Text>
            </Text>
            <Text style={styles.text}>
                Tempat  : <Text>{loc}</Text>
            </Text>
            <Gap height={16} />
            <Text style={styles.text}>
                Deskripsi :
            </Text>
            <Text style={styles.text}>{desc}</Text>
            <Gap height={70} />
            <View style={styles.imageWrapper}>
                <Image source={pic} style={styles.image} resizeMode="cover" />
            </View>
            <Gap height={50} />
            <Buttonproduk label="Terima" onPress={onPress} backgroundColor='#0A3832' width='90%' />
        </View>
    );
};

export default Detailsubmission;

const styles = StyleSheet.create({
    container: {
        width: '85%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginVertical: 10,
        marginHorizontal: 14
    },
    text: {
        fontSize: 14,
        color: 'black',
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        marginBottom: 5,
        marginHorizontal: 24
    },
   
    imageWrapper: {
        width: '95%',
        marginHorizontal: 10,
        height: 180,
        borderRadius: 12,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
