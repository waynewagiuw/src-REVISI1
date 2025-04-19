import react from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const FotoMission = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.contenttext}>FotoMission</Text>
        </SafeAreaView>
    )
}

export default FotoMission

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
})