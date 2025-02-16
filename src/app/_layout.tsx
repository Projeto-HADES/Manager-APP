import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";

export default function Layout() {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="cadastro/index" />
            </Stack>
        </View>
    )
}