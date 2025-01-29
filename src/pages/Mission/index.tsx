import { StatusBar, ScrollView, StyleSheet, Text, Platform, View } from 'react-native';
import React from 'react';
import { Gap, PageHeaderdua, SubMission } from '../../components';
import CC from '../../assets/images/tesCC.jpg'

const Mission = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832" />
            <PageHeaderdua />
            <View style={styles.contentWrapper}>
                <Text style={styles.contenttext}>Misi</Text>
                <SubMission
                    imageSource={CC} 
                    time="15 menit"
                    task="Bersihkan Halaman"
                    points="+P 2"
                    status="0/1"
                    onPress={() => navigation.navigate('MissionDetail')}
                />
                <Gap height={16}/>
                <SubMission
                    imageSource={CC} 
                    time="60 menit"
                    task="Angkat barang"
                    points="+P 8"
                    status="2/5"
                    onPress={() => navigation.navigate('MissionDetail')}
                />
                <Gap height={16}/>
                <SubMission
                    imageSource={CC} 
                    time="15 menit"
                    task="Bersihkan Halaman"
                    points="+P 2"
                    status="0/1"
                    onPress={() => navigation.navigate('MissionDetail')}
                />
                <Gap height={36}/>

            </View>
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
