import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SlotCalendarScreen = ({ route }) => {
    const { category } = route.params; // Get the selected category
    const navigation = useNavigation();

    // Sample list of available time slots
    const timeSlots = [
        { id: '1', time: '9:00 AM' },
        { id: '2', time: '10:00 AM' },
        { id: '3', time: '11:00 AM' },
        { id: '4', time: '1:00 PM' },
        { id: '5', time: '3:00 PM' },
    ];

    // Handle appointment booking
    const handleBooking = (timeSlot: string) => {
        navigation.navigate('SubscriptionScreen', {
            totalPrice: 100, // Example price, replace with dynamic calculation if needed
            beneficiaryCount: 1, // Example beneficiary count, replace dynamically if needed
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Available Slots for {category}</Text>
            <FlatList
                data={timeSlots}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.timeSlot}>{item.time}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleBooking(item.time)}
                        >
                            <Text style={styles.buttonText}>Book Appointment</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    timeSlot: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SlotCalendarScreen;
