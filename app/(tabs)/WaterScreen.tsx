import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Configure Notifications
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const WaterScreen = () => {
    useEffect(() => {
        // Request notification permissions on app load
        const requestPermissions = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission Required',
                    'Please enable notifications to use the water reminder feature.'
                );
            }
        };
        requestPermissions();
    }, []);

    // Schedule water reminders
    const scheduleWaterReminders = async () => {
        try {
            // Cancel all existing notifications
            await Notifications.cancelAllScheduledNotificationsAsync();

            const now = new Date();

            // Schedule the first notification for 1 hour from now
            const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Drink Water 💧',
                    body: 'Stay hydrated! Time to drink water.',
                },
                trigger: { date: oneHourLater },
            });

            // Schedule a reminder 10 minutes before the next alert
            const tenMinutesBefore = new Date(oneHourLater.getTime() - 10 * 60 * 1000);
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Get Ready',
                    body: 'Prepare to drink water in 10 minutes.',
                },
                trigger: { date: tenMinutesBefore },
            });

            Alert.alert('Reminders Scheduled', 'Water reminders are set for the next hour.');
        } catch (error) {
            console.error('Error scheduling notifications:', error);
            Alert.alert('Error', 'Failed to schedule water reminders.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Water Monitor</Text>
            <Text style={styles.infoText}>
                This monitor will remind you to drink water every hour and give a 10-minute advance
                reminder.
            </Text>
            <TouchableOpacity style={styles.button} onPress={scheduleWaterReminders}>
                <Text style={styles.buttonText}>Start Water Reminders</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#00796b',
        marginBottom: 20,
    },
    infoText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#4caf50',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default WaterScreen;
