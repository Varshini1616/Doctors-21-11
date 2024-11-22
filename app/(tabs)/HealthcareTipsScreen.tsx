import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImageScreen from './ImageScreen';

const HealthTipsScreen = () => {
    const navigation = useNavigation();

    const handleNavigation = (value) => {
        navigation.navigate(value); // Navigates to the ImageScreen
    };

    return (
        <View style={styles.container}>
            {/* Healthcare Support Section */}
            <Text style={styles.sectionTitle}>Healthcare support</Text>
            <View style={styles.row}>
                <TouchableOpacity style={styles.grandButton} onPress={() => handleNavigation('StoresScreen')}>
                    <Text style={styles.buttonText}>Stores</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.grandButton} onPress={() => handleNavigation('HCTipsScreen')}>
                    <Text style={styles.buttonText}>HC Tips</Text>
                </TouchableOpacity>
            </View>

            {/* Lab Instruction Section */}
            <Text style={styles.sectionTitle}>Lab Instruction</Text>
            <View style={styles.row}>
                <TouchableOpacity style={styles.grandButton} onPress={() => handleNavigation('MenScreen')}>
                    <Text style={styles.buttonText}>Men</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.grandButton} onPress={() => handleNavigation('WomenScreen')}>
                    <Text style={styles.buttonText}>Women</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.grandButton} onPress={() => handleNavigation('ChildScreen')}>
                    <Text style={styles.buttonText}>Child</Text>
                </TouchableOpacity>
            </View>

            {/* Doctor Consultation Section */}
            <Text style={styles.sectionTitle}>Doctor Consultation</Text>
            <TouchableOpacity style={styles.grandLargeButton} onPress={() => handleNavigation('DoctorScreen')}>
                <Text style={styles.buttonText}>Doctor</Text>
            </TouchableOpacity>

            {/* WSC Health Monitor Section */}
            <Text style={styles.sectionTitle}>WSC Health Monitor</Text>
            <View style={styles.row}>
                <TouchableOpacity style={styles.grandButton} onPress={() => handleNavigation('SleepScreen')}>
                    <Text style={styles.buttonText}>Sleep</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.grandButton} onPress={() => handleNavigation('WakingScreen')}>
                    <Text style={styles.buttonText}>Waking</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.grandButton} onPress={() => handleNavigation('WaterScreen')}>
                    <Text style={styles.buttonText}>Water</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    grandButton: {
        backgroundColor: '#c3d69b',
        paddingVertical: 25,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    grandLargeButton: {
        backgroundColor: '#c3d69b',
        paddingVertical: 35,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 15,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    redButton: {
        backgroundColor: 'red',
        paddingVertical: 25,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 25,
    },
    inviteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default HealthTipsScreen;
