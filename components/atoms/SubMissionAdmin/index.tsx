import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import DeleteIcon from '../../../assets/icon/delete.png';

const SubMissionAdmin = ({ imageSource, time, task, points, status, quota, description, onImagePress, onDelete }) => {
    const statusNum = parseInt(status, 10); // Convert status to number
    const quotaNum = parseInt(quota, 10);   // Convert quota to number
    const isFull = statusNum >= quotaNum;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.imageWrapper} onPress={onImagePress}>
                <Image source={imageSource} style={styles.image} resizeMode="cover" />
            </TouchableOpacity>
            <View style={styles.textWrapper}>
                <View style={styles.detailsWrapper}>
                    <Text style={styles.time}>{time} menit</Text>
                    <View style={styles.taskWrapper}>
                        <Text style={styles.task}>{task}</Text>
                        <Text style={styles.points}>+GP {points}</Text>
                    </View>
                    {/* Ensure status and quota are displayed properly */}
                    <Text style={styles.status}>{statusNum}/{quotaNum}</Text>
                    {isFull && <Text style={styles.fullText}></Text>}
                    <TouchableOpacity onPress={onDelete}>
                        <Image source={DeleteIcon} style={styles.deleteIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default SubMissionAdmin;

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'green',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 7,
        marginVertical: 20,
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
        marginLeft: 16,
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
        textAlign: 'right',
        fontFamily: 'Poppins-Medium',
    },
    fullText: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    deleteIcon: {
        width: 24,
        height: 24,
        marginLeft: 10,
    },
});
