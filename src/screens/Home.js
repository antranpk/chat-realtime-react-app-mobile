import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
import { Entypo } from '@expo/vector-icons';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
const catImageUrl = "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

import Room from './Room';
import { chatRooms } from '../data/chatRooms';
import { AntDesign } from '@expo/vector-icons';

const Home = () => {
    const navigation = useNavigation();

    const signOutNow = () => {
        signOut(auth).then(() => {
            navigation.replace('Login');
        }).catch((error) => {
            // An error happened.
        });
    }

    useEffect(() => {
        navigation.setOptions({
            headerLeft: null,
            headerRight: () => (
                <TouchableOpacity style={{
                    marginRight: 10
                }}
                    onPress={signOutNow}
                >
                    <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}}/>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            {chatRooms.map((chatRoom, index) => {
                return (
                  <Room key={index} chatRoom={chatRoom} />
                );
            })}
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        backgroundColor: "#fff",
    }
});
