import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Gap from '../Gap';

const SubHistory = ({ points, date, time }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Poin Sabat : <Text>{points}</Text>
            </Text>
            <Text style={styles.text}>
                Tanggal : <Text>{date}</Text>
            </Text>
            <Text style={styles.text}>
                Waktu : <Text>{time}</Text>
            </Text>
        </View>
    );
};

export default SubHistory;

const styles = StyleSheet.create({
    container: {
        width: '85%',
        alignSelf: 'center',
        backgroundColor: 'white',
        padding: 15,
        elevation: 7, 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginVertical: 10,
        borderRadius: 12,
        overflow: 'hidden',
    },
    text: {
        fontSize: 15,
        color: 'black',
        marginBottom: 5,
        fontFamily: 'Poppins-Light',

    },
    
});