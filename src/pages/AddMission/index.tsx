import { View, Text, StyleSheet, TextInput, Button, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { Buttonproduk, Gap, PageHeaderAdmin, TextInputdua, Uploadpicture } from '../../components';
import Upload from '../../assets/icon/uploadpic.png';

const AddMission = ({ route, navigation }) => {
    const { onNewMission } = route.params;
    const [task, setTask] = useState('');
    const [time, setTime] = useState('');
    const [points, setPoints] = useState('');
    const [status, setStatus] = useState('0/1');
    const [quota, setQuota] = useState('');
    const [description, setDescription] = useState('');

    const handleAddMission = () => {
        const newMission = {
            imageSource: {Upload},
            task,
            time,
            points,
            status,
            quota,
            description,
        };

        onNewMission(newMission);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#0A3832" />
            <PageHeaderAdmin />
            <Text style={styles.header}>Tambah Misi</Text>
            <View style={styles.contentWrapper}></View>
            <Gap height={26} />
            <TextInputdua
                label={'Tugas :'}

                placeholder="contoh : Membersihkan halaman"
                value={task}
                onChangeText={setTask}
                style={styles.input}
            />
            <TextInputdua
                label={'Waktu :'}

                placeholder="contoh : 60 menit (pilih : 15,30,60 menit)"
                value={time}
                onChangeText={setTime}
                style={styles.input}
            />
            <TextInputdua
                label={'Poin :'}

                placeholder="contoh : 4 (15 menit = 1 poin)"
                value={points}
                onChangeText={setPoints}
                style={styles.input}
            />
            <TextInputdua
                label={'Kuota orang :'}

                placeholder="contoh : 1 (maks 10)"
                value={quota}
                onChangeText={setQuota}
                style={styles.input}
                keyboardType="numeric"
            />
            <TextInputdua
                label={'Deskripsi :'}

                placeholder="contoh : Bersihkan Halaman ini (maks 60 char)"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                multiline={true}
                numberOfLines={4}
            />
            <Uploadpicture pic={Upload} label="Foto tempat : (optional)" />
            <Gap height={16} />

            <Buttonproduk backgroundColor="#0A3832" label="Kirim" onPress={handleAddMission} />
        </View>
    );
};

export default AddMission;

const styles = StyleSheet.create({
    input: { width: 200, height: 40, borderWidth: 1, marginBottom: 10, paddingLeft: 8 },
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
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
});
