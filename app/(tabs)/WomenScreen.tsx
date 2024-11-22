import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const WomenScreen = () => {
    const tips = [
        "Exercise regularly: Engage in at least 30 minutes of moderate exercise daily.",
        "Maintain a balanced diet: Include lean proteins, healthy fats, and plenty of fruits and vegetables.",
        "Stay hydrated: Drink 8-10 glasses of water every day.",
        "Prioritize bone health: Consume calcium and vitamin D-rich foods to prevent osteoporosis.",
        "Sleep well: Get 7-9 hours of quality sleep each night.",
        "Practice stress management: Use yoga, mindfulness, or meditation to reduce stress.",
        "Schedule regular screenings: Get annual checkups for breast health, cervical screenings, and other preventive care.",
        "Limit caffeine and sugar intake: Avoid excessive amounts to maintain energy levels and mood stability.",
        "Monitor hormonal health: Pay attention to your menstrual cycle and consult a doctor for irregularities.",
        "Practice self-care: Dedicate time to activities that make you feel happy and relaxed.",
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Women's Healthcare Tips</Text>
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
        color: '#8e44ad',
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

export default WomenScreen;
