import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Pic from '../../../assets/icon/profil.svg';
import Poin from '../../../assets/icon/poin.svg';

const PageHeader = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pic width={40} height={40} marginTop={15} />
                <Text style={styles.Hello}>Hello! <Text style={styles.yellow} color='#FFC700'>Jhon</Text></Text>
                <Poin width={60} height={60} marginTop={5} marginLeft={125} />
            </View>
        </View>
    );
};

export default PageHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0A3832',
        paddingLeft: 24,
        height: 190,
    },
    header: {
        flexDirection: 'row',
        marginTop: 5
    },
    Hello: {
        fontSize: 20,
        marginTop: 20,
        marginLeft: 15,
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
    },
    yellow: {
        color: '#BBD409',
    }
});
