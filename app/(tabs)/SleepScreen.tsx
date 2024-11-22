import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';

// Configure Notifications
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const SleepScreen = () => {
    const [sleepStartTime, setSleepStartTime] = useState(new Date());
    const [wakeUpTime, setWakeUpTime] = useState(
        new Date(new Date().getTime() + 8 * 60 * 60 * 1000)
    ); // Default 8 hours ahead
    const [isSleepTimerActive, setIsSleepTimerActive] = useState(false);
    const [isAlarmSet, setIsAlarmSet] = useState(false);

    // Function to schedule a wake-up notification
    const scheduleWakeUpNotification = async (time) => {
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Wake Up!',
                    body: "Good morning! It's time to start your day.",
                },
                trigger: { date: time },
            });
            Alert.alert('Alarm Set', `Your alarm is set for ${time.toLocaleTimeString()}`);
        } catch (error) {
            Alert.alert('Error', 'Failed to set the alarm');
        }
    };

    // Start the sleep timer
    const startSleepTimer = () => {
        setIsSleepTimerActive(true);
        Alert.alert('Sleep Timer Started', 'Your sleep timer has started. Sweet dreams!');
    };

    // Set the alarm for the wake-up time
    const setAlarm = async () => {
        setIsAlarmSet(true);
        await scheduleWakeUpNotification(wakeUpTime);
    };

    // Handle sleep time change
    const handleSleepTimeChange = (event, selectedDate) => {
        if (selectedDate) setSleepStartTime(selectedDate);
    };

    // Handle wake-up time change
    const handleWakeUpTimeChange = (event, selectedDate) => {
        if (selectedDate) setWakeUpTime(selectedDate);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Sleep Tracker</Text>

                {/* Sleep Start Time */}
                <View style={styles.section}>
                    <Text style={styles.label}>Set Sleep Time:</Text>
                    <DateTimePicker
                        value={sleepStartTime}
                        mode="time"
                        display="default"
                        onChange={handleSleepTimeChange}
                        style={styles.timePicker}
                    />
                </View>

                {/* Wake-Up Time */}
                <View style={styles.section}>
                    <Text style={styles.label}>Set Wake-Up Time:</Text>
                    <DateTimePicker
                        value={wakeUpTime}
                        mode="time"
                        display="default"
                        onChange={handleWakeUpTimeChange}
                        style={styles.timePicker}
                    />
                </View>

                {/* Start Sleep Timer Button */}
                <TouchableOpacity
                    style={[
                        styles.button,
                        isSleepTimerActive ? styles.buttonActive : styles.buttonInactive,
                    ]}
                    onPress={startSleepTimer}
                >
                    <Text style={styles.buttonText}>Start Sleep Timer</Text>
                </TouchableOpacity>

                {/* Set Alarm Button */}
                <TouchableOpacity style={[styles.button, styles.alarmButton]} onPress={setAlarm}>
                    <Text style={styles.buttonText}>Set Wake-Up Alarm</Text>
                </TouchableOpacity>

                {/* Display Sleep and Wake-Up Times */}
                <View style={styles.timeDisplay}>
                    <Text style={styles.timeText}>
                        Sleep Time: {sleepStartTime.toLocaleTimeString()}
                    </Text>
                    <Text style={styles.timeText}>
                        Wake-Up Time: {wakeUpTime.toLocaleTimeString()}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    container: {
        width: '100%',
        maxWidth: 800, // Set max width for larger screens
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#3498db',
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
        width: '100%',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 10,
    },
    button: {
        width: '80%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonActive: {
        backgroundColor: '#2ecc71',
    },
    buttonInactive: {
        backgroundColor: '#3498db',
    },
    alarmButton: {
        backgroundColor: '#e74c3c',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    timeDisplay: {
        marginTop: 20,
        alignItems: 'center',
    },
    timeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#34495e',
        marginVertical: 5,
    },
    timePicker: {
        width: '100%',
        backgroundColor: '#fff',
    },
});

export default SleepScreen;
