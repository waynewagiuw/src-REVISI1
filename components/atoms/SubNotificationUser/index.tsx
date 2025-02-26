import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Gap from '../Gap';

const SubNotificationUser = ({ task, progress, subpoin }) => {
    // Limit the task to 20 characters and add '...' if it's too long
    const truncatedTask = task.length > 20 ? task.substring(0, 20) + '...' : task;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Misi            : <Text style={styles.boldText}>{truncatedTask}</Text>
            </Text>
            <Text style={styles.text}>
                GP               : <Text style={styles.boldText}>{subpoin}</Text>
            </Text>
            <Text style={styles.text}>
                Progress   : <Text style={styles.boldText}>{progress}</Text>
            </Text>
           
        </View>
    );
};

export default SubNotificationUser;

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
    boldText: {
        fontFamily: 'Poppins-Bold',
        color: 'black',
    },
});
