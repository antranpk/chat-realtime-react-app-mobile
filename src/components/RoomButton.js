import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../colors';
import { useNavigation } from "@react-navigation/native";

const RoomButton = ({ chatRoom }) => {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<TouchableOpacity
                onPress={() => navigation.navigate("Chat", {roomId: chatRoom.id, roomTitle: chatRoom.title})}
                style={styles.chatButton}
            >
                <Text>{chatRoom.title}</Text>
            </TouchableOpacity>
		</View>
	)
}

export default RoomButton

const styles = StyleSheet.create({
	container: {
		width: "30%",
		marginTop: 10,
		marginLeft: 10,
		marginRight: 30
	},
	chatButton: {
        backgroundColor: colors.primary,
        height: 50,
        width: 150,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .9,
        shadowRadius: 8,
        marginRight: 20,
        marginBottom: 20,
    }
});
