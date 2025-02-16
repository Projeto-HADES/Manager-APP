import { navigation } from "@/utils/navigation";

import { Pressable, Text, View } from "react-native";

export default function Login() {
    return (
        <View>
            <Text>Login</Text>

            <Pressable onPress={() => navigation("/cadastro")}>
                <Text>Cadastro</Text>
            </Pressable>
        </View>
    )
}