import React, { useState, useEffect } from 'react';
import { StatusBar, ScrollView, StyleSheet, Text, Platform, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Gap, PageHeaderAdminDua, SubNotification } from '../../components';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const db = getDatabase();
        const submissionsRef = ref(db, 'submissions/');

        // Fetch notifications from submissions
        onValue(submissionsRef, (snapshot) => {
            if (snapshot.exists()) {
                const submissions = snapshot.val();
                const notificationList = [];

                Object.keys(submissions).forEach((userName) => {
                    const userSubmissions = submissions[userName];
                    Object.keys(userSubmissions).forEach((missionId) => {
                        const submission = userSubmissions[missionId];
                        notificationList.push({
                            userName: userName,
                            missionId: missionId,
                            task: submission.task,
                            date: submission.date,
                        });
                    });
                });

                setNotifications(notificationList);
            }
        });
    }, []);

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#0A3832" />
            <PageHeaderAdminDua />
            <View style={styles.contentWrapper}>
                <Text style={styles.contenttext}>Notifikasi</Text>
                <Gap height={16} />

                <FlatList
                    data={notifications}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <SubNotification
                            name={item.userName}
                            task={item.task}
                            date={item.date}
                            missionId={item.missionId}
                            userName={item.userName}
                        />
                    )}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
    },
    contenttext: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: 'black',
        marginLeft: 40,
        marginTop: 20,
    },
    contentWrapper: {
        backgroundColor: 'white',
        width: 400,
        justifyContent: 'center',
        alignSelf: 'center',
    },
});

export default Notification;
