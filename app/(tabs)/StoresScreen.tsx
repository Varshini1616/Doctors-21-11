import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
    TextInput,
    ScrollView,
} from 'react-native';

const StoresScreen = () => {
    const [stores, setStores] = useState([
        {
            id: '1',
            name: 'Store A',
            status: 'Available',
            products: [
                { id: 'p1', name: 'Paracetamol', price: 50 },
                { id: 'p2', name: 'Vitamin C', price: 120 },
                { id: 'p3', name: 'Ibuprofen', price: 100 },
                { id: 'p4', name: 'Cough Syrup', price: 80 },
            ],
        },
        {
            id: '2',
            name: 'Store B',
            status: 'Unavailable',
            products: [
                { id: 'p5', name: 'Pain Reliever', price: 150 },
                { id: 'p6', name: 'Bandages', price: 30 },
                { id: 'p7', name: 'Antibiotic Cream', price: 90 },
                { id: 'p8', name: 'Thermometer', price: 250 },
            ],
        },
    ]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [customerName, setCustomerName] = useState('');

    // Calculate total amount
    const calculateTotal = () => {
        return selectedProducts.reduce(
            (total, product) => total + product.price * product.quantity,
            0
        );
    };

    // Add product to cart
    const bookProduct = (product) => {
        setSelectedProducts((prevProducts) => {
            const productIndex = prevProducts.findIndex((p) => p.id === product.id);
            if (productIndex >= 0) {
                const updatedProducts = [...prevProducts];
                updatedProducts[productIndex].quantity += 1;
                return updatedProducts;
            }
            return [...prevProducts, { ...product, quantity: 1 }];
        });
    };

    // Remove or decrement product quantity
    const cancelProduct = (productId) => {
        setSelectedProducts((prevProducts) => {
            const productIndex = prevProducts.findIndex((p) => p.id === productId);
            if (productIndex >= 0) {
                const updatedProducts = [...prevProducts];
                if (updatedProducts[productIndex].quantity > 1) {
                    updatedProducts[productIndex].quantity -= 1; // Decrease quantity
                } else {
                    updatedProducts.splice(productIndex, 1); // Remove product if quantity is 0
                }
                return updatedProducts;
            }
            return prevProducts;
        });
    };

    // Render a store's product
    const renderProductItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>₹{item.price}</Text>
            <TouchableOpacity
                style={styles.bookButton}
                onPress={() => bookProduct(item)}
            >
                <Text style={styles.bookButtonText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );

    // Render selected products with quantity and cancel button
    const renderSelectedProduct = ({ item }) => (
        <View style={styles.cartItem}>
            <Text style={styles.cartItemName}>{item.name}</Text>
            <Text style={styles.cartItemQuantity}>Qty: {item.quantity}</Text>
            <Text style={styles.cartItemPrice}>₹{item.price * item.quantity}</Text>
            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => cancelProduct(item.id)}
            >
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );

    // Handle booking submission
    const handleBooking = () => {
        if (selectedProducts.length === 0 || customerName.trim() === '') {
            Alert.alert('Incomplete Details', 'Please add items to your cart and provide your name.');
            return;
        }

        Alert.alert(
            'Booking Confirmed',
            `Thank you, ${customerName}! Your booking includes:\n\n${selectedProducts
                .map((p) => `${p.name} (Qty: ${p.quantity}) - ₹${p.price * p.quantity}`)
                .join('\n')}\n\nTotal Amount: ₹${calculateTotal()}`
        );
        setSelectedProducts([]);
        setCustomerName('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Healthcare Support Stores</Text>
            <ScrollView>
                <FlatList
                    data={stores}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.storeContainer}>
                            <Text style={styles.storeName}>{item.name}</Text>
                            <Text
                                style={[
                                    styles.storeStatus,
                                    item.status === 'Available' ? styles.available : styles.unavailable,
                                ]}
                            >
                                {item.status}
                            </Text>
                            <FlatList
                                data={item.products}
                                keyExtractor={(product) => product.id}
                                renderItem={renderProductItem}
                                contentContainerStyle={styles.productList}
                            />
                        </View>
                    )}
                />
            </ScrollView>
            <View style={styles.cartContainer}>
                <Text style={styles.cartTitle}>
                    Cart (Total: ₹{calculateTotal()})
                </Text>
                <FlatList
                    data={selectedProducts}
                    keyExtractor={(item) => item.id}
                    renderItem={renderSelectedProduct}
                />
            </View>
            <View style={styles.bookingContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={customerName}
                    onChangeText={setCustomerName}
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleBooking}>
                    <Text style={styles.submitButtonText}>Confirm Booking</Text>
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
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#34495e',
        marginBottom: 20,
        textAlign: 'center',
    },
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    productName: {
        fontSize: 16,
    },
    productPrice: {
        fontSize: 16,
        color: '#34495e',
    },
    bookButton: {
        backgroundColor: '#e67e22',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    bookButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cartContainer: {
        marginVertical: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    cartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cartItemName: {
        fontSize: 16,
    },
    cartItemQuantity: {
        fontSize: 16,
        color: '#888',
    },
    cartItemPrice: {
        fontSize: 16,
        color: '#34495e',
    },
    cancelButton: {
        backgroundColor: '#e74c3c',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    cancelButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    bookingContainer: {
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: '#27ae60',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default StoresScreen;
