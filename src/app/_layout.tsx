import { useEffect, useRef, useState } from "react";

import { Stack } from "expo-router";

import { Platform, StatusBar, View } from "react-native";

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export default function Layout() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
        undefined
    );
    const notificationListener = useRef<Notifications.EventSubscription>();
    const responseListener = useRef<Notifications.EventSubscription>();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));
    
        if (Platform.OS === 'android') {
          Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
        }
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          notificationListener.current &&
            Notifications.removeNotificationSubscription(notificationListener.current);
          responseListener.current &&
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    async function registerForPushNotificationsAsync() {
        let token;
      
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('myNotificationChannel', {
            name: 'A channel is needed for the permissions prompt to appear',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();

          let finalStatus = existingStatus;

          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }

          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }

          try {
            const projectId =
              Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
            if (!projectId) {
              throw new Error('Project ID not found');
            }
            token = (
              await Notifications.getExpoPushTokenAsync({
                projectId,
              })
            ).data;
            console.log(token);
          } catch (e) {
            token = `${e}`;
          }
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        return token;
    }

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