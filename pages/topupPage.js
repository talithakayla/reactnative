import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { createPost } from "../api/restApi"; // Ensure the path is correct for your project

export default function TopUpPage() {
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("BYOND Pay");
  const [open, setOpen] = useState(false);

  const handleTopUp = async () => {
    const topUpAmount = parseInt(amount, 10) || 0;

    if (topUpAmount > 0) {
      try {
        // Create the payload for the API request
        const payload = {
          type: "c", // 'c' for credit (top-up)
          from_to: paymentMethod, // Use a relevant identifier for the payment method
          amount: topUpAmount,
          description: notes || "Top-up via app",
        };

        // Call the createPost function
        const response = await createPost(payload);

        // Show success alert
        Alert.alert("Success", `Top-up of IDR ${topUpAmount.toLocaleString()} was successful!`);

        // Clear the input fields
        setAmount("");
        setNotes("");
      } catch (error) {
        console.error("Failed to process top-up:", error);
        Alert.alert("Error", "Failed to process top-up. Please try again.");
      }
    } else {
      Alert.alert("Error", "Please enter a valid amount.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Top Up</Text>
          </View>

          <View style={styles.amountBox}>
            <Text style={styles.label}>Amount</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currency}>IDR</Text>
              <TextInput
                style={styles.amountInput}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#C7C7C7"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Payment Method</Text>
            <DropDownPicker
              open={open}
              value={paymentMethod}
              items={[
                { label: "BYOND Pay", value: "BYOND Pay" },
                { label: "Credit Card", value: "Credit Card" },
                { label: "Bank Transfer", value: "Bank Transfer" },
                { label: "E-Wallet", value: "E-Wallet" },
              ]}
              setOpen={setOpen}
              setValue={setPaymentMethod}
              placeholder="Select a Payment Method"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.dropdownText}
            />
          </View>

          <View style={styles.notesBox}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Add a note (optional)"
              value={notes}
              onChangeText={setNotes}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.topUpButton} onPress={handleTopUp}>
              <Text style={styles.topUpButtonText}>Top Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 16,
    marginBottom: 24,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    padding: 16,
  },
  amountBox: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  label: {
    fontSize: 14,
    color: "#9E9E9E",
    marginBottom: 8,
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#DADADA",
    paddingBottom: 4,
  },
  currency: {
    fontSize: 24,
    color: "#000000",
    fontWeight: "600",
    marginRight: 8,
  },
  amountInput: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000000",
    flex: 1,
  },
  section: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  dropdown: {
    borderWidth: 0,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },
  dropdownContainer: {
    borderWidth: 0,
    backgroundColor: "#FFFFFF",
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingVertical: 10,
  },
  topUpButton: {
    backgroundColor: "#088A85",
    borderRadius: 6,
    alignItems: "center",
    paddingVertical: 12,
    width: "90%",
  },
  topUpButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  notesBox: {
    marginBottom: 32,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  notesInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#DADADA",
    paddingVertical: 4,
    fontSize: 16,
    color: "#000000",
  },
});
