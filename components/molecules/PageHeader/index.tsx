import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Pic from '../../../assets/icon/profil.svg';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import Logo from '../../../assets/icon/Eco';


const PageHeader = () => {
   const [firstName, setFirstName] = useState('');
       const [lastName, setLastName] = useState('');
   
       useEffect(() => {
           // Ambil data pengguna yang sedang login
           const auth = getAuth();
           const user = auth.currentUser;
   
           if (user) {
               const db = getDatabase();
               const userRef = ref(db, `users/${user.uid}`);
   
               // Ambil data dari Firebase Realtime Database
               onValue(userRef, (snapshot) => {
                   const data = snapshot.val();
                   if (data && data.username) {
                       const nameParts = data.username.split(' '); // Pisahkan nama depan dan belakang
                       const first = nameParts[0] || ''; // Nama depan
                       const last = nameParts.slice(1).join(' ') || ''; // Nama belakang
   
                       // Potong nama jika lebih dari 17 karakter
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
                    <Text style={styles.pointeks}>0 GP</Text>
                </View>
            </View>
            <Text style={styles.title}> Poin dikurangi :</Text>
            <Text style={[styles.title, { marginTop: 0 }]}> 0</Text>
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
    yellow: {
        color: '#BBD409',
    },
    poin: {
        height: 30,
        width: 75,
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: 20,
        marginLeft: 'auto', // Posisikan poin di ujung kanan
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