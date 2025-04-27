import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SubNotification = ({ name, date, missionId }) => {
    const navigation = useNavigation();

    const truncateName = (name) => {
        return name.length > 22 ? name.substring(0, 22) + '...' : name;
    };

    const handlePress = () => {
        // Navigate to the Validation screen with the necessary parameters
        navigation.navigate('Validation', { userName: name, missionId });
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
            <Text style={styles.text}>
                Nama     : <Text style={styles.boldText}>{truncateName(name)}</Text>
            </Text>
            {date && (
                <Text style={styles.text}>
                    Tanggal  : <Text style={styles.boldText}>{date}</Text>
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
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

export default SubNotification;