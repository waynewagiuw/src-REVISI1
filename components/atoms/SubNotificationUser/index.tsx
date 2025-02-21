import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SubNotificationUser = ({ task, progress }) => {
    const navigation = useNavigation();

    const goToValidation = () => {
        navigation.navigate('Validation');
    };

    return (
        <TouchableOpacity onPress={goToValidation} style={styles.container}>
            <Text style={styles.text}>
                Task           : <Text style={styles.boldText}>{task}</Text>
            </Text>
                <Text style={styles.text}>
                    Progress   : <Text style={styles.boldText}>{progress}</Text>
                </Text>
            
        </TouchableOpacity>
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
