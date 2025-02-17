import React, { useEffect, useState } from 'react';
import { View, ScrollView, StatusBar, Text, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Gap, PageHeaderdua, SubMission } from '../../components';
import Null from '../../assets/icon/null.png';

const Mission = ({ navigation }) => {
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const missionsRef = ref(db, 'missions/');

        const unsubscribe = onValue(missionsRef, (snapshot) => {
            if (snapshot.exists()) {
                const fetchedMissions = snapshot.val();
                const missionList = Object.keys(fetchedMissions).map(key => ({
                    id: key,
                    ...fetchedMissions[key],
                }));
                setMissions(missionList);
            } else {
                console.log("No missions found");
            }
        });

        return () => unsubscribe();
    }, []);

    const handleImagePress = (mission) => {
        navigation.navigate('MissionDetail', { missionId: mission.id });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#0A3832" />
            {/* Assuming PageHeaderdua is a custom header component */}
            <View style={styles.headerWrapper}><PageHeaderdua /></View>
            <ScrollView style={styles.scrollWrapper}>
                <View style={styles.contentWrapper}>
                    <Text style={styles.contenttext}>Misi</Text>
                    {missions.map((mission) => {
                        const imageSource = mission.imageSource ? { uri: mission.imageSource } : null;
                        const status = parseInt(mission.status, 10);
                        const quota = parseInt(mission.quota, 10);
                        return (
                            <SubMission
                                key={mission.id}
                                imageSource={mission.imageSource ? { uri: mission.imageSource } : Null} // Fallback to default image if no imageSource in mission
                                time={mission.time}
                                task={mission.task}
                                points={mission.points}
                                status={status}
                                quota={quota}
                                onPress={() => handleImagePress(mission)} // Pass mission to handle press
                            />
                        );
                    })}
                    <Gap height={46} />
                </View>
            </ScrollView>
        </View>
    );
};

export default Mission;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    headerWrapper: {
        position: 'absolute',
        left: 0,
        top : 20, 
        right: 0,
        zIndex: 1,
    },
    scrollWrapper: {
        marginTop: 80,
    },
    contenttext: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: 'black',
        marginLeft: 40,
        marginTop: 20
    },
    contentWrapper: {
        backgroundColor: 'white',
        width: 400,
        justifyContent: 'center',
        alignSelf: 'center',
    },
});