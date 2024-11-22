import React, { useState } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';

const Elite360Page = () => {
  const [elite360Duration, setElite360Duration] = useState("1");
  const conversionRate = 83; // Example conversion rate: 1 USD = 83 INR

  return (
    <View style={styles.container}>
      <Text style={styles.planTitle}>ELITE 360</Text>
      <Text style={styles.beneficiaryText}>Each Beneficiary:</Text>
      <Picker
        selectedValue={elite360Duration}
        style={styles.picker}
        onValueChange={(itemValue) => setElite360Duration(itemValue)}
      >
        <Picker.Item label={`1 Month - $199 / ₹${199 * conversionRate}`} value="1" />
        <Picker.Item label={`3 Months - $570 / ₹${570 * conversionRate}`} value="3" />
        <Picker.Item label={`6 Months - $1140 / ₹${1140 * conversionRate}`} value="6" />
        <Picker.Item label={`12 Months - $2280 / ₹${2280 * conversionRate}`} value="12" />
      </Picker>
      <Text style={styles.planDetails}>
        24/7 Health care assistant
        {"\n"}One home visit by field executive
        {"\n"}Complete blood count, urine routine, TSH, HBA1C
        {"\n"}Random blood sugar, Renal function test
        {"\n"}Liver function test, Serum Electrolyte, Serum VIT D
        {"\n"}Urine PCR, Peripheral Smear
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

export default Elite360Page;
