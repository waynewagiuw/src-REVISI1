import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Platform, TextInput } from 'react-native';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { Gap, PageHeaderAdmin, Buttonproduk } from '../../components';
import SubListStaf from '../../components/atoms/SubListStaf';

const ListStaf = () => {
    const [admins, setAdmins] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const db = getDatabase();
        const adminRef = ref(db, 'admins'); // Accessing the admins path directly

        onValue(adminRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const adminList = [];

                // Loop through each entry in admins
                Object.keys(data).forEach((key) => {
                    const entry = data[key];
                    adminList.push({
                        id: key,
                        name: entry.username,
                        role: entry.role,
                    });
                });

                setAdmins(adminList);
            } else {
                setAdmins([]);
            }
        });
    }, []);

    // Filter admins based on search query
    const filteredAdmins = admins.filter(admin =>
        admin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDeleteAdmin = (adminId) => {
        const db = getDatabase();
        const adminRef = ref(db, 'admins/' + adminId);

        remove(adminRef)
            .then(() => {
                console.log('Admin deleted from Firebase');
                setAdmins((prevAdmins) => prevAdmins.filter(admin => admin.id !== adminId));
            })
            .catch((error) => {
                console.error('Error deleting admin: ', error);
            });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#0A3832" />
            <PageHeaderAdmin />

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.contentWrapper}>
                    <Text style={styles.contenttext}>Daftar Admin</Text>
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

                    {filteredAdmins.length > 0 ? (
                        filteredAdmins.map((admin) => (
                            <SubListStaf
                                key={admin.id}
                                name={admin.name}
                                role={admin.role}
                                onDelete={() => handleDeleteAdmin(admin.id)} // Handle delete admin
                            />
                        ))
                    ) : (
                        <Text style={styles.noTransactions}>Tidak ada admin yang ditemukan.</Text>
                    )}
                </View>
            </ScrollView>
            <View style={styles.buttonWrapper}>
                <Buttonproduk width="80%" label="Tambahkan Admin" onPress={() => navigation.navigate('AddSupervisor')} backgroundColor="#0A3832" />
            </View>
        </View>
    );
};

export default ListStaf;

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
