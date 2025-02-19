import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const Submission = ({ imageSource, time, task, points, status, quota, onPress }) => {
  const statusNum = parseInt(status, 10); // Convert status to number
  const quotaNum = parseInt(quota, 10);   // Convert quota to number
  const isFull = statusNum >= quotaNum;   // Check if the mission is full

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageWrapper}>  
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.textWrapper}>
        <View style={styles.detailsWrapper}>  
          <Text style={styles.time}>{time} menit</Text>
          <View style={styles.taskWrapper}>
            <Text style={styles.task}>{task}</Text>
            <Text style={styles.points}>+GP {points}</Text>
          </View>
          <Text style={styles.status}>{statusNum}/{quotaNum}</Text>
          {/* Show "Full" text if the mission status is full */}
          {isFull && <Text style={styles.fullText}>Penuh</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Submission;

const styles = StyleSheet.create({
    container: {
        width: '85%',
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
        fontSize: 13,
        color: 'black',
        flex: 1,
        fontFamily: 'Poppins-Medium',

    },
    taskWrapper: {
        flex: 2,
        flexDirection: 'column',
        marginHorizontal:10
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
    fullText: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
        marginTop: -20,
      }
});