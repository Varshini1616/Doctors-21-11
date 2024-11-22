import React, { useState } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';

const ProxyCarePage = () => {
  const [proxyCareDuration, setProxyCareDuration] = useState("1");
  const conversionRate = 83; // Example conversion rate: 1 USD = 83 INR

  return (
    <View style={styles.container}>
      <Text style={styles.planTitle}>PROXY CARE</Text>
      <Text style={styles.beneficiaryText}>Each Beneficiary:</Text>
      <Picker
        selectedValue={proxyCareDuration}
        style={styles.picker}
        onValueChange={(itemValue) => setProxyCareDuration(itemValue)}
      >
        <Picker.Item label={`1 Month - $42 / ₹${42 * conversionRate}`} value="1" />
        <Picker.Item label={`3 Months - $120 / ₹${120 * conversionRate}`} value="3" />
        <Picker.Item label={`6 Months - $240 / ₹${240 * conversionRate}`} value="6" />
        <Picker.Item label={`12 Months - $480 / ₹${480 * conversionRate}`} value="12" />
      </Picker>
      <Text style={styles.planDetails}>
        24/7 Health care assistant
        {"\n"}One home visit by field executive
        {"\n"}Lab investigations
        {"\n"}Complete blood count, urine routine, TSH, HBA1C
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

export default ProxyCarePage;
