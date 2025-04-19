import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const Submission = ({ imageSource, time, task, points, status, quota, expire, supervisor, onPress }) => {
  const statusNum = parseInt(status, 10) || 0;
  const quotaNum = parseInt(quota, 10) || 0;
  const isFull = statusNum >= quotaNum;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.containerdua}>
        <Text style={styles.supervisor}>Supervisor : {supervisor || 'Tidak ada supervisor'}</Text>
        <Text style={styles.expire}>Expired : {expire || 'Tidak ada informasi'}</Text>
      </View>
      <View style={styles.imageWrapper}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.textWrapper}>
        <View style={styles.detailsWrapper}>
          <Text style={styles.time}>{time ? `${time} menit` : 'Waktu tidak tersedia'}</Text>
          <View style={styles.taskWrapper}>
            <Text style={styles.task}>{task || 'Tugas tidak tersedia'}</Text>
            <Text style={styles.points}>+GP {points || 0}</Text>
          </View>
          <Text style={[styles.status, { color: isFull ? 'red' : 'green' }]}>
            {statusNum}/{quotaNum}
            {isFull && <Text style={styles.fullText}> Penuh</Text>}
          </Text>
        </View>

      </View>
    </TouchableOpacity>
  );
};

export default Submission;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 7,
    marginVertical: 20,
    paddingBottom: 10,
  },
  containerdua: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    padding: 5
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
    marginHorizontal: 10,
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
    flex: 1,
    textAlign: 'right',
    fontFamily: 'Poppins-Medium',
  },
  fullText: {
    fontSize: 12,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  expire: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Poppins-Medium',
    marginTop: 5,
  },
  supervisor: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Poppins-Medium',
    marginTop: 3,
  },
});
