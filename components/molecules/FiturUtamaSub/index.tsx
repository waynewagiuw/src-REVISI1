import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const FiturUtamaSub = ({ image, title, pageName, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.iconContainer}>
                <Image source={image} style={styles.icon} />
            </View>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',  
        height: '100%', 
    },
    iconContainer: {
        height: 80,
        width: 80,
    },
    icon: {
        width: '100%',
        height: '100%',
    },
    title: {
        textAlign: 'center',
        marginTop: 4,
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        color: 'black'
    },
});

export default FiturUtamaSub;
