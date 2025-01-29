import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const SubMission = ({ imageSource, time, task, points, status, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.imageWrapper}>  
                <Image source={imageSource} style={styles.image} resizeMode="cover" />
            </View>
            <View style={styles.textWrapper}>
                <View style={styles.detailsWrapper}>  
                    <Text style={styles.time}>{time}</Text>
                    <View style={styles.taskWrapper}>
                        <Text style={styles.task}>{task}</Text>
                        <Text style={styles.points}>{points}</Text>
                    </View>
                    <Text style={styles.status}>{status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default SubMission;

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'green',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 7,
        marginVertical: 10,
    },
    imageWrapper: {
        width: '100%',
        height: 150,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textWrapper: {
        backgroundColor: 'white',
        padding: 10,

    },
    detailsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    time: {
        fontSize: 14,
        color: 'black',
        flex: 1,
        fontFamily: 'Poppins-Medium',

    },
    taskWrapper: {
        flex: 2,
        flexDirection: 'column',
        marginHorizontal:24
    },
    task: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Poppins-Medium',

    },
    points: {
        fontSize: 14,
        color: '#FFC700',
        fontFamily: 'Poppins-Medium',

    },
    status: {
        fontSize: 14,
        color: 'red',
        flex: 1,
        textAlign: 'right',
        fontFamily: 'Poppins-Medium',

    },
});
