import { StatusBar, ScrollView, StyleSheet, Text, Platform, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Gap, PageHeaderdua, SubMission } from '../../components';
import CC from '../../assets/images/tesCC.jpg'; // Default image if no imageSource in mission

const Mission = ({ navigation }) => {
    const [missions, setMissions] = useState([]); // Store missions in state

    // Fetch data from Firebase with real-time listener
    useEffect(() => {
        const db = getDatabase();
        const missionsRef = ref(db, 'missions/');
        
        // Set up a real-time listener
        const unsubscribe = onValue(missionsRef, (snapshot) => {
            if (snapshot.exists()) {
                const fetchedMissions = snapshot.val();
                console.log('Fetched missions:', fetchedMissions); // Log to check the data structure
                
                const missionList = Object.keys(fetchedMissions).map(key => ({
                    id: key,
                    ...fetchedMissions[key],
                }));

                // Append new missions if not already in state
                setMissions(missionList);
            } else {
                console.log("No missions found");
            }
        });

        // Cleanup the listener when the component unmounts or re-renders
        return () => unsubscribe();
    }, []);

    // Handle Image Press (optional)
    const handleImagePress = (mission) => {
        navigation.navigate('MissionDetail', { missionId: mission.id });
    };

    return (
        <ScrollView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832" />
            <PageHeaderdua />
            <View style={styles.contentWrapper}>
                <Text style={styles.contenttext}>Misi</Text>
                
                <Gap height={36}/>

                {/* Display missions */}
                {missions.length > 0 ? (
                    missions.map((mission) => (
                        <SubMission
                            key={mission.id}
                            imageSource={mission.imageSource ? { uri: mission.imageSource } : CC} // Fallback to default image if no imageSource in mission
                            time={mission.time}
                            task={mission.task}
                            points={mission.points}
                            status={mission.status}
                            onPress={() => handleImagePress(mission)} // Pass mission to handle press
                        />
                    ))
                ) : (
                    <Text>No missions available.</Text>
                )}
            </View>
            <Gap height={46}/>
        </ScrollView>
    );
};

export default Mission;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
        marginTop: -100
    },
});
