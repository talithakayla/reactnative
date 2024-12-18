import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { createPost } from "../api/restApi"; // Import the createPost function from your API file

export default function TransferPage({ recipient = "09072001" }) {
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);  // Add loading state

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const handleTransfer = async () => {
    const transferAmount = parseInt(amount, 10) || 0;

    if (transferAmount > 0) {
      setLoading(true);  // Set loading state to true when transfer starts

      // Prepare data for the API request
      const postData = {
        type: "d",  // 'd' for transfer
        from_to: recipient,  // Recipient's number
        amount: transferAmount,
        description: notes || "",  // Use notes as the description, default to empty if not provided
      };

      try {
        const response = await createPost(postData);
        setAmount("");  // Clear amount input
        setNotes("");   // Clear notes input
        setLoading(false);  // Set loading state to false after response

        Alert.alert("Transfer Successful!", "Your transfer was successful.", [{ text: "OK" }]);
      } catch (error) {
        setLoading(false);  // Set loading state to false in case of error
        Alert.alert("Transfer Failed", error.message, [{ text: "OK" }]);
      }
    } else {
      Alert.alert("Invalid Amount", "Please enter a valid transfer amount.", [{ text: "OK" }]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Transfer</Text>
          </View>

          {/* Recipient Section */}
          <View style={styles.recipientBox}>
            <Text style={styles.recipientText}>To: </Text>
            <Text style={styles.recipientNumber}>{recipient}</Text>
          </View>

          {/* Amount Section */}
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
                onChangeText={(text) => setAmount(text)}
              />
            </View>
          </View>

          {/* Notes Section */}
          <View style={styles.notesBox}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={styles.notesInput}
              placeholder=""
              value={notes}
              onChangeText={(text) => setNotes(text)}
            />
          </View>

          {/* Transfer Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.transferButton} onPress={handleTransfer} disabled={loading}>
              <Text style={styles.transferButtonText}>
                {loading ? "Processing..." : "Transfer"}
              </Text>
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
  recipientBox: {
    backgroundColor: "#088A85",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  recipientText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  recipientNumber: {
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 8,
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
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingVertical: 10,
  },
  transferButton: {
    backgroundColor: "#088A85",
    borderRadius: 6,
    alignItems: "center",
    paddingVertical: 12,
    width: "90%",
  },
  transferButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

