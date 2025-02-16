import { navigation } from "@/utils/navigation";

import { Pressable, Text, View } from "react-native";

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
});

export default function Login() {
    const handleNotification = async () => {
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'MIZERAAAAAA',
                body: "EU VOU DESTRUIR A TUA VIDA!",
            },
            trigger: null,
        });
    }

    return (
        <View>
            <Text>Login</Text>

            <Pressable onPress={() => navigation("/cadastro")}>
                <Text>Cadastro</Text>
            </Pressable>

            <Pressable onPress={() => handleNotification()}>
                <Text>Notificações</Text>
            </Pressable>
        </View>
    )
}