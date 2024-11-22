import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons'; // For dropdown arrow
import bggif from '../../assets/images/bsp.gif'; // Ensure the GIF path is correct

// Define your beneficiary interface
interface Beneficiary {
  id: string;
  name: string;
  mobile: string;
  history: string;
  selectedPlan: string;
  isSelected: boolean;
}

type RootStackParamList = {
  AddBeneficiaryScreen: { beneficiary?: Beneficiary; isEditing: boolean };
  SubscriptionScreen: { totalPrice: number; beneficiaryCount: number };
  BeneficiaryDetailsScreen: { newBeneficiary?: Beneficiary; isEditing: boolean };
};

type BeneficiaryDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BeneficiaryDetailsScreen'>;

const BeneficiaryDetailsScreen: React.FC = () => {
  const navigation = useNavigation<BeneficiaryDetailsScreenNavigationProp>();

  // State for beneficiaries
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    { id: '1', name: 'John Doe', mobile: '092800 97973', history: 'Hypertension', selectedPlan: '199', isSelected: false },
    { id: '2', name: 'Jane Smith', mobile: '98765 43216', history: 'Diabetes', selectedPlan: '99', isSelected: false },
  ]);

  // State to show the modal for selecting plans
  const [selectedBeneficiaryId, setSelectedBeneficiaryId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // Function to handle plan selection from modal
  const handleSelectPlan = (plan: string) => {
    setBeneficiaries((prevState) =>
      prevState.map((beneficiary) =>
        beneficiary.id === selectedBeneficiaryId ? { ...beneficiary, selectedPlan: plan } : beneficiary
      )
    );
    setModalVisible(false); // Close the modal after selecting a plan
    setSelectedBeneficiaryId(null); // Clear selected beneficiary
  };

  // Function to open the plan selection modal
  const openPlanModal = (id: string) => {
    setSelectedBeneficiaryId(id);
    setModalVisible(true); // Show modal
  };

  // Toggle selection of the beneficiary
  const handleSelectBeneficiary = (id: string) => {
    setBeneficiaries((prevState) =>
      prevState.map((beneficiary) =>
        beneficiary.id === id ? { ...beneficiary, isSelected: !beneficiary.isSelected } : beneficiary
      )
    );
  };

  // Handle delete beneficiary
  const handleDeleteBeneficiary = (id: string) => {
    setBeneficiaries((prevState) => prevState.filter((beneficiary) => beneficiary.id !== id));
  };

  // Handle edit beneficiary
  const handleEditBeneficiary = (beneficiary: Beneficiary) => {
    navigation.navigate('AddBeneficiaryScreen', { beneficiary, isEditing: true });
  };

  // Function to add a new beneficiary
  const handleAddBeneficiary = () => {
    navigation.navigate('AddBeneficiaryScreen', { isEditing: false });
  };

  // Function to navigate to SubscriptionScreen
  const handleProceedToSubscription = () => {
    navigation.navigate('SubscriptionScreen', {
      totalPrice: 0, // You can replace this with the actual total price if needed
      beneficiaryCount: beneficiaries.filter(b => b.isSelected).length, // Count of selected beneficiaries
    });
  };

  // Render function for beneficiaries list
  const renderItem = ({ item }: { item: Beneficiary }) => (
    <View style={styles.beneficiaryItem}>
      <View style={styles.beneficiaryDetails}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.mobile}>{item.mobile}</Text>
        <Text style={styles.history}>{item.history}</Text>
      </View>

      {/* Plan selection text field with dropdown arrow */}
      <View style={styles.planContainer}>
        <TextInput
          style={styles.planInput}
          value={item.selectedPlan ? `${item.selectedPlan} Plan` : 'Select Plan'}
          editable={false} // Make it read-only
        />
        <TouchableOpacity onPress={() => openPlanModal(item.id)} style={styles.dropdownArrow}>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Buttons for Edit, Delete, and Select */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditBeneficiary(item)}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteBeneficiary(item.id)}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.selectButton]}
          onPress={() => handleSelectBeneficiary(item.id)}
        >
          <Text style={styles.actionButtonText}>{item.isSelected ? 'Deselect' : 'Select'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground source={bggif} style={styles.background} resizeMode="cover">
      <View style={styles.overlay} />
      <View style={styles.container}>
        <FlatList data={beneficiaries} keyExtractor={(item) => item.id} renderItem={renderItem} />
        
        {/* Modal for plan selection */}
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Select a Plan</Text>
              <Pressable style={styles.modalOption} onPress={() => handleSelectPlan('10')}>
                <Text>10 Plan</Text>
              </Pressable>
              <Pressable style={styles.modalOption} onPress={() => handleSelectPlan('99')}>
                <Text>99 Plan</Text>
              </Pressable>
              <Pressable style={styles.modalOption} onPress={() => handleSelectPlan('199')}>
                <Text>199 Plan</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Buttons for adding beneficiary and proceeding to subscription */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.bottomButton} onPress={handleAddBeneficiary}>
            <Text style={styles.buttonText}>Add Beneficiary</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.bottomButton} onPress={handleProceedToSubscription}>
            <Text style={styles.buttonText}>Proceed to Subscription</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for contrast
  },
  container: { 
    flex: 1, 
    padding: 30, 
    zIndex: 1 // Ensures content is above the background
  },
  beneficiaryItem: {
    marginBottom: 40,
    padding: 30, 
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 }, 
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 7,
  },
  beneficiaryDetails: {
    marginBottom: 15,
  },
  name: { 
    fontWeight: 'bold', 
    fontSize: 20, 
    marginBottom: 8,
  },
  mobile: { 
    color: '#555', 
    marginBottom: 8, 
    fontSize: 18, 
  },
  history: { 
    color: '#555', 
    fontSize: 18, 
  },
  planContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  planInput: {
    flex: 1,
    height: 40,
    color: '#333',
    fontSize: 16,
  },
  dropdownArrow: {
    marginLeft: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    paddingVertical: 8, 
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    marginRight: 5,
  },
  selectButton: {
    backgroundColor: '#28A745', 
  },
  editButton: {
    backgroundColor: '#17A2B8',
  },
  deleteButton: {
    backgroundColor: '#DC3545', 
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  buttonContainer: {
    flexDirection: 'row', // Align buttons in a row
    justifyContent: 'space-around', // Spread buttons evenly
    marginTop: 20, 
    width: '110%',
  },
  bottomButton: {
    backgroundColor: '#007BFF', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '45%', // Equal width for both buttons
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default BeneficiaryDetailsScreen;
