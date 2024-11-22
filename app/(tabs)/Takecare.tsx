import React, { useState } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';

const TakeCarePage = () => {
  const [takeCareDuration, setTakeCareDuration] = useState("1");
  const conversionRate = 83; // Example conversion rate: 1 USD = 83 INR

  return (
    <View style={styles.container}>
      <Text style={styles.planTitle}>TAKE CARE</Text>
      <Text style={styles.beneficiaryText}>Each Beneficiary:</Text>
      <Picker
        selectedValue={takeCareDuration}
        style={styles.picker}
        onValueChange={(itemValue) => setTakeCareDuration(itemValue)}
      >
        <Picker.Item label={`1 Month - $9.99 / ₹${(9.99 * conversionRate).toFixed(2)}`} value="1" />
        <Picker.Item label={`3 Months - $29.97 / ₹${(29.97 * conversionRate).toFixed(2)}`} value="3" />
        <Picker.Item label={`6 Months - $59.94 / ₹${(59.94 * conversionRate).toFixed(2)}`} value="6" />
        <Picker.Item label={`12 Months - $119.88 / ₹${(119.88 * conversionRate).toFixed(2)}`} value="12" />
      </Picker>
      <Text style={styles.planDetails}>
        24/7 Health care assistant
        {"\n"}One home visit by field executive
        {"\n"}One zoom session with general consultant (max 20 mins)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  beneficiaryText: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
  },
  picker: {
    height: 40,
    marginBottom: 10,
  },
  planDetails: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default TakeCarePage;
