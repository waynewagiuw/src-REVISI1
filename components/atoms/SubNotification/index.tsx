import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SubNotification = ({ name, task, date, missionId, userName }) => {
    const navigation = useNavigation();

    const truncateName = (name) => {
        if (name.length > 22) {
            return name.substring(0, 22) + '...';
        }
        return name;
    };

    const truncateTask = (task) => {
        if (task.length > 22) {
            return task.substring(0, 22) + '...';
        }
        return task;
    };

    const goToValidation = () => {
        navigation.navigate('Validation', { userName, missionId, task });
    };

    return (
        <TouchableOpacity onPress={goToValidation} style={styles.container}>
            <Text style={styles.text}>
                Nama      : <Text style={styles.boldText}>{truncateName(name)}</Text>
            </Text>
            <Text style={styles.text}>
                Misi         : <Text style={styles.boldText}>{truncateTask(task)}</Text>
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

export default SubNotification;
