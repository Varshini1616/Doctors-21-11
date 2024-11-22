import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CategorySelectionScreen from './CategorySelectionScreen';
import SlotCalendarScreen from './SlotCalendarScreen';

const Stack = createStackNavigator();

const DoctorScreen = () => {
    return (
        <Stack.Navigator initialRouteName="CategorySelectionScreen">
            <Stack.Screen
                name="CategorySelectionScreen"
                component={CategorySelectionScreen}
                options={{ title: 'Select Category' }}
            />
            <Stack.Screen
                name="SlotCalendarScreen"
                component={SlotCalendarScreen}
                options={{ title: 'Slot Calendar' }}
            />
        </Stack.Navigator>
    );
};

export default DoctorScreen;
