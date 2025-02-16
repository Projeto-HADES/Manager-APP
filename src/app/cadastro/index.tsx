import { navigation } from "@/utils/navigation";

import { Pressable, Text, View } from "react-native";

export default function Cadastro() {
    return (
        <View>
            <Text>Cadastro</Text>

            <Pressable onPress={() => navigation("/")}>
                <Text>Login</Text>
            </Pressable>
        </View>
    )
}