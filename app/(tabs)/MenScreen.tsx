import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const MenScreen = () => {
    const tips = [
        "Exercise regularly: Aim for at least 30 minutes a day of moderate exercise.",
        "Eat a balanced diet: Focus on whole grains, lean proteins, and plenty of vegetables.",
        "Stay hydrated: Drink at least 8-10 glasses of water daily.",
        "Sleep well: Ensure you get 7-8 hours of quality sleep every night.",
        "Manage stress: Practice mindfulness, yoga, or deep breathing exercises.",
        "Get regular checkups: Visit your doctor annually to monitor your health.",
        "Avoid smoking and excessive drinking: These habits can lead to chronic diseases.",
        "Maintain a healthy weight: Combine exercise and a balanced diet to avoid obesity.",
        "Prioritize mental health: Seek help if you're feeling overwhelmed or depressed.",
        "Stay active socially: Spend time with friends and family to boost mental health.",
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Men's Healthcare Tips</Text>
            {tips.map((tip, index) => (
                <View key={index} style={styles.tipContainer}>
                    <Text style={styles.tip}>{`${index + 1}. ${tip}`}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 20,
    },
    tipContainer: {
        marginBottom: 15,
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    tip: {
        fontSize: 16,
        color: '#34495e',
    },
});

export default MenScreen;
