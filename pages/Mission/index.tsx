import { StatusBar, TouchableOpacity,ScrollView, StyleSheet, Text, Platform, View } from 'react-native';
import React from 'react';
import { Gap, PageHeader, } from '../../components';
import Tips from '../../assets/images/tips'
import CC from '../../assets/images/misisatu'
import Box from '../../assets/images/plant'
import Bersih from '../../assets/images/bersih'
import Poinsatu from '../../assets/icon/poinsatu'
import Eco from '../../assets/icon/ecohijau';



const Mission = ({navigation}) => {


    return (
        <ScrollView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor="#0A3832" />
            <PageHeader
            />
            <View style={styles.contentWrapper}>
                <Text style={styles.contenttext}>Misi</Text>
                <TouchableOpacity style={styles.event} onPress={() => navigation.navigate('MissionDetail')}>
                    <Tips width={'100%'} height={'100%'} />

                </TouchableOpacity>
                <Gap height={16} />
                <View style={styles.eventbawah}>
                    <View style={styles.eventbawah}>

                        <View style={[styles.eventtiga,
                        { marginTop: 230 },
                        { height: 75 },
                        { backgroundColor: 'white' },
                        { elevation: 2 },
                        { flexDirection: 'row' }
                        ]}>
                            <Poinsatu width={40} height={40} marginTop={25} marginLeft={5} />
                            <View style={styles.pointext}>
                                <Text style={styles.pointextname}>Uploud Picture ...</Text>
                                <Text style={styles.pointextpoin}>+P 50</Text>
                            </View>
                        </View>
                        <Gap height={16} />
                        <View style={[styles.eventempat,
                        { marginTop: 230 },
                        { height: 75 },
                        { backgroundColor: 'white' },
                        { elevation: 2 },
                        { flexDirection: 'row' }
                        ]}>
                            <Eco width={35} height={35} marginTop={25} marginLeft={5} />
                            <View style={styles.pointext}>
                                <Text style={styles.pointextname}>Uploud Picture ...</Text>
                                <Text style={styles.pointextpoin}>+P 50</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.eventbawah}>
                    <View style={styles.eventtiga}>
                        <CC width={'100%'} height={'100%'} />
                    </View>
                    <Gap height={16} />
                    <View style={styles.eventempat}>
                        <Box width={'102%'} height={'100%'} />

                    </View>
                </View>

                <Gap height={16} />
                <View style={[styles.event, { backgroundColor: '#2DB5B5' }, { marginTop: -15 }, { marginBottom: 40 }]}>
                    <Bersih width={'100%'} height={'120%'} />
                </View>
                <Gap height={16} />
                <View style={styles.eventbawah}>
                    <View style={styles.eventbawah}>

                        <View style={[styles.eventtiga,
                        { marginTop: 230 },
                        { height: 75 },
                        { backgroundColor: 'white' },
                        { elevation: 2 },
                        { flexDirection: 'row' }
                        ]}>
                            <Poinsatu width={40} height={40} marginTop={25} marginLeft={5} />
                            <View style={styles.pointext}>
                                <Text style={styles.pointextname}>Uploud Picture ...</Text>
                                <Text style={styles.pointextpoin}>+P 50</Text>
                            </View>
                        </View>
                        <Gap height={16} />
                        <View style={[styles.eventempat,
                        { marginTop: 230 },
                        { height: 75 },
                        { backgroundColor: 'white' },
                        { elevation: 2 },
                        { flexDirection: 'row' }
                        ]}>
                            <Eco width={35} height={35} marginTop={25} marginLeft={5} />
                            <View style={styles.pointext}>
                                <Text style={styles.pointextname}>Uploud Picture ...</Text>
                                <Text style={styles.pointextpoin}>+P 50</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.eventbawah}>
                    <View style={styles.eventtiga}>
                        <CC width={'100%'} height={'100%'} />
                    </View>
                    <Gap height={16} />
                    <View style={styles.eventempat}>
                        <Box width={'102%'} height={'100%'} />

                    </View>
                </View>
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
    event: {
        marginHorizontal: 26,
        height: 180,
        marginTop: 10,
        backgroundColor: '#00A652',
        borderRadius: 7,
    },
    eventbawah: {
        flexDirection: 'row',
    },
    eventtiga: {
        marginHorizontal: 26,
        height: 250,
        width: '42%',
        marginTop: -305,
        backgroundColor: '#F4ECDA',
        borderRadius: 14,
    },
    eventempat: {
        marginHorizontal: 26,
        height: 250,
        width: '42%',
        marginLeft: -12,
        marginTop: -305,
        backgroundColor: '#D8F6F8',
        borderRadius: 14,
    },
    poinimage: {
        width: 15,
        height: 15
    },
    pointext: {
        marginTop: 27,
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        marginLeft: 10
    },
    pointextname: {
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        color: 'Black',
    },
    pointextpoin: {
        fontSize: 13,
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        color: '#FFC700',

    },
});
