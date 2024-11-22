import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const categories = [
    { id: '1', name: 'Cardiologists' },
    { id: '2', name: 'Dermatologists' },
    { id: '3', name: 'Pediatricians' },
    { id: '4', name: 'Orthopedists' },
];

const CategorySelectionScreen = ({ navigation }) => {
    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => navigation.navigate('SlotCalendarScreen', { category: item.name })}
        >
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Doctor Category</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={renderCategoryItem}
                contentContainerStyle={styles.listContainer}
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
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    listContainer: {
        paddingBottom: 20,
    },
    categoryButton: {
        backgroundColor: '#4caf50',
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    categoryText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CategorySelectionScreen;
