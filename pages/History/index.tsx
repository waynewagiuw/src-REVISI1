import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, update, set, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Gap, PageHeaderdua, SubHistory, Buttonproduk } from '../../components';

const History = () => {
    const [transactions, setTransactions] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const db = getDatabase();
            const transactionRef = ref(db, `Transactions/${user.uid}`);

            onValue(transactionRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const transactionList = Object.keys(data).map((key) => ({
                        date: key,
                        points: data[key].points,
                        
                    }));
                    setTransactions(transactionList);
                } else {
                    setTransactions([]);
                }
            });
        }
    }, []);

    const handleReset = () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const db = getDatabase();
            const userRef = ref(db, `users/${user.uid}`);
            const transactionRef = ref(db, `Transactions/${user.uid}`);

            // Reset vouchers to 0
            update(userRef, {
                vouchers: 0, // Set vouchers to 0
            })
                .then(() => {
                    console.log('Vouchers reset successfully.');

                    // Delete all transactions
                    set(transactionRef, null) // Setting the reference to null deletes the node
                        .then(() => {
                            console.log('Transaction history cleared successfully.');
                            navigation.navigate('ResetVerification'); // Navigate to success screen

                        })
                        .catch((error) => {
                            console.error('Error clearing transaction history:', error);
                            alert('Terjadi kesalahan saat menghapus riwayat transaksi.');
                        });
                })
                .catch((error) => {
                    console.error('Error resetting vouchers:', error);
                    alert('Terjadi kesalahan saat mereset voucher.');
                });
        } else {
            alert('Pengguna tidak ditemukan. Silakan login kembali.');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#0A3832" />
            <PageHeaderdua title="Riwayat Transaksi" />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.contentWrapper}>
                    <Text style={styles.contenttext}>Riwayat</Text>
                    {transactions.length > 0 ? (
                        transactions.map((transaction, index) => (
                            <SubHistory key={index} points={transaction.points} date={transaction.date} />
                        ))
                    ) : (
                        <Text style={styles.noTransactions}>Tidak ada riwayat transaksi.</Text>
                    )}
                </View>
            </ScrollView>
            <View style={styles.buttonWrapper}>
                <Buttonproduk width="80%" label="Reset" onPress={handleReset} backgroundColor="#0A3832" />
            </View>
        </View>
    );
};

export default History;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 20,
        left: '42%',
        transform: [{ translateX: -150 }],
        width: '100%',
        zIndex: 1,
    },
    scrollViewContent: {
        paddingBottom: 80,
    },
    contenttext: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: 'black',
        marginLeft: 40,
        marginTop: 20,
    },
    contentWrapper: {
        backgroundColor: 'white',
        width: 400,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    noTransactions: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
    },
});