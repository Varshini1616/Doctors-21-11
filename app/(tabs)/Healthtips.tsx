import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
const HealthTips = ({ calories, water }) => {
const [healthTip, setHealthTip] = useState('');
const generateHealthTip = () => {
let tip = '';
if (calories < 1800) {
tip = 'Consider increasing your calorie intake if you have a physically active lifestyle.';
} else if (calories > 2500) {
tip = 'You may need to balance high-calorie intake with regular exercise.';
} else {
tip = 'Maintain a balanced diet with plenty of vegetables, fruits, and whole grains.';
}
if (water < 2) {
tip += ' Also, increase your water intake to stay hydrated.';
}
setHealthTip(tip);
};
return (
<View style={styles.container}>
<Text style={styles.title}>Health Tips</Text>
<Button title="Get Health Tips" onPress={generateHealthTip} />
{healthTip && <Text style={styles.tipText}>{healthTip}</Text>}
</View>
);
};
const styles = StyleSheet.create({
container: {
flex: 1,
padding: 20,
justifyContent: 'center',
backgroundColor: '#f8f9fa',
},
title: {
fontSize: 24,
fontWeight: 'bold',
textAlign: 'center',
marginBottom: 20,
},
tipText: {
fontSize: 16,
fontStyle: 'italic',
textAlign: 'center',
marginTop: 10,
},
});
export default HealthTips;

