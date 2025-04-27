import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Pic from '../../../assets/icon/profil.svg';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import Logo from '../../../assets/icon/Eco';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Poin from '../../../assets/icon/paper.svg';

const PageHeader = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userPoints, setUserPoints] = useState(0); // Default to 0 to ensure it's a number
    const [vouchers, setVouchers] = useState(0); // Default to 0 for vouchers

    const navigation = useNavigation();

    const handlePoinPress = () => {
        // Navigasi langsung tanpa input username
        navigation.navigate('ListPoinUser');
    };

    useEffect(() => {
        // Get the current logged-in user
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const db = getDatabase();
            const userRef = ref(db, `users/${user.uid}`);

            // Fetch data from Firebase Realtime Database
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                if (data && data.username) {
                    const nameParts = data.username.split(' '); // Split first and last name
                    const first = nameParts[0] || ''; // First name
                    const last = nameParts.slice(1).join(' ') || ''; // Last name

                    // Truncate name if it's longer than 17 characters
                    const fullName = `${first} ${last}`;
                    if (fullName.length > 17) {
                        const truncatedName = fullName.substring(0, 17) + '...';
                        const truncatedParts = truncatedName.split(' ');
                        setFirstName(truncatedParts[0] || '');
                        setLastName(truncatedParts.slice(1).join(' ') || '');
                    } else {
                        setFirstName(first);
                        setLastName(last);
                    }

                    // Fetch userpoints and vouchers from Firebase
                    setUserPoints(data.userpoints !== undefined ? data.userpoints : 0); // Use a fallback of 0
                    setVouchers(data.vouchers !== undefined ? data.vouchers : 0); // Use a fallback of 0
                }
            });
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Logo width={40} height={40} marginTop={15} />
                <Text style={styles.Hello}>
                    {firstName}
                    {lastName ? <Text style={styles.yellow}> {lastName}</Text> : null}
                </Text>
                <View style={styles.poin}>
                    {/* Ensure proper text rendering by wrapping both userPoints and GP inside Text */}
                    <Text style={styles.pointeks}>
                        {userPoints} <Text>GP</Text>
                    </Text>
                </View>
            </View>
            <Text style={styles.title}> Poin Voucher :</Text>
            {/* Display the vouchers value dynamically */}
            <Text style={[styles.title, { marginTop: 0 }]}>{vouchers}</Text>
           <View> 
            <TouchableOpacity onPress={handlePoinPress}>
                <Poin width={30} height={30} style={styles.poinIcon} />
            </TouchableOpacity>
            </View>
        </View>
    );
};

export default PageHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0A3832',
        paddingLeft: 24,
        height: 280,
    },
    header: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
    },
    Hello: {
        fontSize: 18,
        marginTop: 20,
        marginLeft: 5,
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
    },
    poinIcon: {
        marginRight: 24,
    },
    yellow: {
        color: '#BBD409',
    },
    poin: {
        height: 30,
        width: 75,
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 20,
        marginLeft: 'auto', // Position points to the right
        marginRight: 24,
    },
    pointeks: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        color: '#0A3832',
        textAlign: 'center',
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 32,
        marginTop: 70,
        color: 'white',
        textAlign: 'center',
        marginLeft: -20,
    },
});