import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ChildScreen = () => {
    const tips = [
        "Ensure a balanced diet: Include fruits, vegetables, whole grains, proteins, and dairy products.",
        "Encourage physical activity: Children should have at least 60 minutes of active play every day.",
        "Limit screen time: Restrict TV, gaming, and mobile usage to 1-2 hours daily.",
        "Promote regular sleep: Ensure children get 9-12 hours of sleep each night, depending on their age.",
        "Encourage proper hydration: Teach children to drink water frequently and avoid sugary drinks.",
        "Practice good hygiene: Teach hand washing, tooth brushing, and personal cleanliness habits.",
        "Schedule regular health checkups: Visit the doctor for vaccinations and routine screenings.",
        "Encourage mental well-being: Spend quality time with your child, encourage open communication, and provide emotional support.",
        "Promote safety: Use car seats, helmets, and childproof homes to prevent injuries.",
        "Teach healthy habits: Encourage habits like eating slowly, mindful eating, and not skipping meals.",
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Children's Healthcare Tips</Text>
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
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3498db',
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
        color: '#2c3e50',
    },
});

export default ChildScreen;
