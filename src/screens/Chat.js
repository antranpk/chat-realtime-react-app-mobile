import React, { useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';

import { AntDesign } from '@expo/vector-icons';

import colors from '../colors.js';

const Chat = ({ navigation, route }) => {
    const [messages, setMessages] = useState([]);
    const { roomId, roomTitle, otherParam } = route.params;
    const signOutNow = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.replace('Login');
        }).catch((error) => {
            // An error happened.
        });
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{
                    marginRight: 10
                }}
                    onPress={signOutNow}
                >
                    <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}}/>
                </TouchableOpacity>
            )
        })

        const q = query(collection(db, 'chats', roomId, 'messages'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.id,
                timestamp: doc.data().timestamp,
                text: doc.data().text,
                user: doc.data().user,
            }))
        ));

        return () => {
          unsubscribe();
        };

    }, [navigation]);

    const onSend = useCallback((messages = []) => {

        const { text, user } = messages[0];

        console.log(user);

        addDoc(collection(db, 'chats', roomId, 'messages'), { uid: user.uid, timestamp: serverTimestamp(),  text, user });
    }, []);

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            showUserAvatar={true}
            onSend={messages => onSend(messages)}
            messagesContainerStyle={{
                backgroundColor: '#fff'
            }}
            textInputStyle={{
                backgroundColor: '#fff',
                borderRadius: 20,
            }}
            user={{
                _id: auth?.currentUser?.email,
                uid: auth?.currentUser?.uid,
                displayName: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL
            }}
        />
    );
}

export default Chat;
