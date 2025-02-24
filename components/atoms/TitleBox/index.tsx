import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Gap from '../Gap';
import { Buttonproduk } from '..';

const TitleBox = ({ label, placeholder }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.contentwrapper}>
                {/* Pastikan placeholder diteruskan dengan benar ke TextInput */}
                <TextInput 
                    style={styles.input} 
                    placeholder={placeholder} 
                    placeholderTextColor="#ABABAB"  // Optional: Menentukan warna placeholder
                />
            </View>
            <Gap height={26} />
        </View>
    );
};

export default TitleBox;


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
        marginTop:-20
    },
    contentwrapper: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 7,
    },
    input: {
        borderColor: 'black',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        textAlign:'center',
        color:'#ABABAB'
      },
    label: {
        fontSize: 14,
        color: 'black',
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        marginHorizontal: 20

    },
    inputWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ddd',
    },
    
});
