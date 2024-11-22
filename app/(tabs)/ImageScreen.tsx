import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ImageScreen = () => {
    // State to manage timer
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    // Function to toggle the timer
    const toggleTimer = () => {
        setIsActive(!isActive); // Start or stop the timer
    };

    // Reset the timer
    const resetTimer = () => {
        setIsActive(false);
        setSeconds(0);
    };

    // useEffect to update the timer
    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds((seconds) => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    // Format the time display
    const formatTime = (seconds) => {
        const getSeconds = `0${seconds % 60}`.slice(-2);
        const minutes = Math.floor(seconds / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);
        return `${getMinutes}:${getSeconds}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sleep Timer</Text>
            <View style={styles.timerContainer}>
                <Text style={styles.timer}>{formatTime(seconds)}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, isActive ? styles.buttonActive : styles.buttonInactive]}
                    onPress={toggleTimer}
                >
                    <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.resetButton} onPress={resetTimer}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f7fa',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 30,
    },
    timerContainer: {
        backgroundColor: '#ecf0f1',
        borderRadius: 15,
        padding: 20,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    timer: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#2980b9',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 12,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 10,
    },
    buttonActive: {
        backgroundColor: '#e74c3c',
    },
    buttonInactive: {
        backgroundColor: '#27ae60',
    },
    resetButton: {
        backgroundColor: '#8e44ad',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 12,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ImageScreen;
