import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const openRegisterScreen = () => {
      navigation.navigate('Register');
    };

    useEffect(() => {
        navigation.setOptions({
            headerLeft: null
        });
    }, [navigation]);

    const signin = () => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigation.navigate('Home');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter your email'
                label='Email'
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder='Enter your password'
                label='Password'
                leftIcon={{ type: 'material', name: 'lock' }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <Pressable style={styles.button} onPress={signin}>
              <Text style={styles.text}>Sign in</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={openRegisterScreen}>
              <Text style={styles.text}>Register</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginTop: 100,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginTop: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#2196F3',
        width: "100%"
      },
});

export default Login;
