import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Logo from '../../../assets/icon/Eco';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const PageHeaderdua = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userPoints, setUserPoints] = useState(0); // Default to 0 for userpoints

    useEffect(() => {
        // Get the currently logged-in user
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const db = getDatabase();
            const userRef = ref(db, `users/${user.uid}`);

            // Fetch data from Firebase Realtime Database
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    // Extract and set username
                    if (data.username) {
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
                    }

                    // Extract and set userpoints
                    if (data.userpoints !== undefined) {
                        setUserPoints(data.userpoints); // Set userpoints value
                    } else {
                        setUserPoints(0); // Fallback to 0 if userpoints is not defined
                    }
                }
            });
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Logo width={40} height={40} marginTop={15} />
                <Text style={styles.Hello}>
                    {firstName} <Text style={styles.yellow}>{lastName}</Text>
                </Text>
                <View style={styles.poin}>
                    {/* Display userpoints dynamically */}
                    <Text style={styles.pointeks}>{userPoints} GP</Text>
                </View>
            </View>
        </View>
    );
};

export default PageHeaderdua;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0A3832',
        paddingLeft: 24,
        height: 80,
    },
    header: {
        flexDirection: 'row',
        marginTop: 5,
    },
    Hello: {
        fontSize: 18,
        marginTop: 20,
        marginLeft: 5,
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
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
});