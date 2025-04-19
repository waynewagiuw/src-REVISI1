import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import DeleteIcon from '../../../assets/icon/delete.png';

const SubMissionAdmin = ({ imageSource, time, task, points, status, quota, expire, onImagePress, onDelete, onPress, supervisor }) => {
    const statusNum = parseInt(status, 10) || 0;
    const quotaNum = parseInt(quota, 10) || 0;
    const isFull = statusNum >= quotaNum;

    return (
        <TouchableOpacity onPress={onPress} >

            <View style={styles.container}>
                <View style={styles.containerdua}>
                    <Text style={styles.supervisorText}>Supervisor : {supervisor || 'Tidak ada supervisor'}</Text>
                    <Text style={styles.supervisorText}>Deadline : {expire}</Text>

                </View>
                <View style={styles.imageWrapper}>
                    <Image source={imageSource} style={styles.image} resizeMode="cover" onPress={onImagePress} />
                </View>
                <View style={styles.textWrapper}>
                    <View style={styles.detailsWrapper}>
                        <Text style={styles.time}>{time ? `${time} menit` : 'Waktu tidak tersedia'}</Text>
                        <View style={styles.taskWrapper}>
                            <Text style={styles.task}>{task || 'Tugas tidak tersedia'}</Text>
                            <Text style={styles.points}>+GP {points || 0}</Text>
                        </View>
                        <Text style={[styles.status, { color: isFull ? 'red' : 'green' }]}>{statusNum}/{quotaNum}</Text>
                        {isFull && <Text style={styles.fullText}>Penuh</Text>}
                        <TouchableOpacity onPress={onDelete}>
                            <Image source={DeleteIcon} style={styles.deleteIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </TouchableOpacity>
    );
};

export default SubMissionAdmin;

const styles = StyleSheet.create({
    container: {
        width: '85%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 5,
        marginVertical: 30
    },
    containerdua: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: -5
    },
    imageWrapper: {
        width: '100%',
        height: 150
    },
    image: {
        width: '100%',
        height: '100%'
    },
    textWrapper: {
        backgroundColor: 'white',
        padding: 10
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
        marginTop:-20
    },
    deleteIcon: {
        width: 24,
        height: 24,
        marginLeft: 10
    },
    supervisorText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12, color: 'black',
        fontWeight: 'bold',
        marginTop: 0,
        padding: 15
    },
});
