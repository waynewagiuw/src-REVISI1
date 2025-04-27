import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Platform, TextInput } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { Gap, PageHeaderAdmin, Buttonproduk } from '../../components';
import SubListPoin from '../../components/atoms/SubListPoin';

const ListPoin = () => {
    const [transactions, setTransactions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const db = getDatabase();
        const transactionRef = ref(db, 'StudentsPoinSabat'); // Accessing the main path directly

        onValue(transactionRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const transactionList = [];

                // Loop through each entry in StudentsPoinSabat
                Object.keys(data).forEach((key) => {
                    const entry = data[key];
                    transactionList.push({
                        name: entry.nama,
                        gender: entry.gender,
                        seating: entry.seating,
                        outsider: entry.outsider,
                        points: entry.poin,
                        date: key // Store the key as date or timestamp
                    });
                });

                // Sort transactions to show the latest first
                transactionList.sort((a, b) => b.date.localeCompare(a.date));
                setTransactions(transactionList);
            } else {
                setTransactions([]);
            }
        });
    }, []);

    const handleAdd = () => {
        navigation.navigate('AddListPoin');
    };

    // Filter transactions based on search query
    const filteredTransactions = transactions.filter(transaction =>
        transaction.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#0A3832" />
            <PageHeaderAdmin />

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.contentWrapper}>
                    <Text style={styles.contenttext}>Poin Mahasiswa</Text>
                    <Gap height={14} />
                    <View style={styles.searchContainer}>

                        <TextInput
                            style={styles.searchInput}
                            placeholder="Cari berdasarkan nama..."
                            value={searchQuery}
                            placeholderTextColor="gray"
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    <Gap height={14} />

                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((transaction, index) => (
                        <SubListPoin
                            key={index}
                            name={transaction.name}
                            gender={transaction.gender}
                            seating={transaction.seating}
                            outsider={transaction.outsider}
                            points={transaction.points}
                            onPress={() => navigation.navigate('EditPoin', { id: transaction.date })} // date = Firebase key
                        />
                    ))
                    
                    ) : (
                        <Text style={styles.noTransactions}>Tidak ada riwayat transaksi.</Text>
                    )}
                </View>
            </ScrollView>
            <View style={styles.buttonWrapper}>
                <Buttonproduk width="80%" label="Tambahkan" onPress={handleAdd} backgroundColor="#0A3832" />
            </View>
        </View>
    );
};

export default ListPoin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
    },
    searchContainer: {
        padding: 10,
    },
    searchInput: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 36,
        paddingHorizontal: 10,
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