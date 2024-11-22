import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const WakingScreen = () => {
    const [startTime, setStartTime] = useState(null); // Start time of waking
    const [elapsedTime, setElapsedTime] = useState(0); // Elapsed time in seconds
    const [isTracking, setIsTracking] = useState(false);

    // Start tracking waking time
    const startWakingMeter = () => {
        if (isTracking) {
            Alert.alert('Already Tracking', 'The waking meter is already running.');
            return;
        }
        const now = new Date();
        setStartTime(now);
        setElapsedTime(0); // Reset elapsed time on new start
        setIsTracking(true);
        Alert.alert('Waking Meter Started', `Started tracking at ${now.toLocaleTimeString()}.`);
    };

    // Stop tracking waking time
    const stopWakingMeter = () => {
        if (!isTracking) {
            Alert.alert('Not Tracking', 'The waking meter is not running.');
            return;
        }
        const now = new Date();
        const duration = Math.floor((now - startTime) / 1000);
        setElapsedTime(duration);
        setIsTracking(false);
        Alert.alert(
            'Waking Meter Stopped',
            `You have been awake for ${formatTime(duration)}.`,
        );
    };

    // Format time for display
    const formatTime = (seconds) => {
        if (seconds <= 0) return '0h 0m 0s';
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${minutes}m ${secs}s`;
    };

    // Update elapsed time when tracking
    useEffect(() => {
        let interval = null;
        if (isTracking) {
            interval = setInterval(() => {
                const now = new Date();
                const duration = Math.floor((now - startTime) / 1000);
                setElapsedTime(duration);
            }, 1000);
        } else {
            if (interval) clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTracking, startTime]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Waking Meter</Text>
            <View style={styles.section}>
                <Text style={styles.label}>Elapsed Time:</Text>
                <Text style={styles.time}>
                    {isTracking || elapsedTime > 0 ? formatTime(elapsedTime) : 'Not Tracking'}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.startButton]}
                    onPress={startWakingMeter}
                >
                    <Text style={styles.buttonText}>Start Waking</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.stopButton]}
                    onPress={stopWakingMeter}
                >
                    <Text style={styles.buttonText}>Stop Waking</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#3f51b5',
        marginBottom: 20,
    },
    section: {
        marginBottom: 40,
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        color: '#34495e',
        marginBottom: 10,
    },
    time: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2ecc71',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    button: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '45%',
    },
    startButton: {
        backgroundColor: '#4caf50',
    },
    stopButton: {
        backgroundColor: '#f44336',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default WakingScreen;
