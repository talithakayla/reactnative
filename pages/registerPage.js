import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Modal,
  ScrollView, TouchableWithoutFeedback, Keyboard
} from "react-native";
import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function RegisterPage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // Error states for validation
  const [fullnameError, setFullnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isCheckedError, setIsCheckedError] = useState("");

  // Modal visibility state
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const handleRegister = () => {
    let valid = true;

    // Reset errors
    setFullnameError("");
    setEmailError("");
    setPasswordError("");
    setIsCheckedError("");

    // Validate Fullname
    if (fullname.length <= 3) {
      setFullnameError("Fullname must be more than 3 characters.");
      valid = false;
    }

    // Validate Email
    if (!email.includes("@")) {
      setEmailError("Email must contain '@'.");
      valid = false;
    }

    // Validate Password
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      valid = false;
    }

    // Validate Terms & Conditions
    if (!isChecked) {
      setIsCheckedError("You must agree to the Terms and Conditions.");
      valid = false;
    }

    // If form is valid, proceed to register
    if (valid) {
      alert("Registration Successful!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1,  justifyContent: "center"}}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/wallet.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, fullnameError && styles.inputError]}
          placeholder="Fullname"
          placeholderTextColor="black"
          value={fullname}
          onChangeText={setFullname}
        />
        {fullnameError ? <Text style={styles.errorText}>{fullnameError}</Text> : null}

        <TextInput
          style={[styles.input, emailError && styles.inputError]}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="black"
          value={email}
          onChangeText={setEmail}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          style={[styles.input, passwordError && styles.inputError]}
          placeholder="Password"
          placeholderTextColor="black"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Avatar URL"
          placeholderTextColor="black"
          value={avatarUrl}
          onChangeText={setAvatarUrl}
        />
      </View>

      {/* Terms and Conditions */}
      <View style={{ marginBottom: 20 }}>
        <View style={styles.termsContainer}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={isChecked ? "checked" : "unchecked"}
              onPress={() => setIsChecked(!isChecked)}
              color="#088A85"
            />
          </View>
          <Text style={styles.termsText}>
            I have read and agree to the{" "}
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.termsLink}>Terms and Conditions</Text>
            </TouchableOpacity>
            <Text style={{ color: "red" }}> *</Text>
          </Text>
        </View>
        {isCheckedError ? <Text style={[styles.errorText, { marginLeft:15}]}>{isCheckedError}</Text> : null}
      </View>

      {/* Register Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>

      {/* Navigate to Login */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Login here</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Terms and Conditions */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Terms and Conditions</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Text style={styles.modalText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
                odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
                quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
                mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
                Vestibulum lacinia arcu eget nulla.{"\n\n"}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
                odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
                quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
                mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
                Vestibulum lacinia arcu eget nulla.{"\n\n"}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
                odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
                quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
                mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
                Vestibulum lacinia arcu eget nulla.{"\n\n"}
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", paddingHorizontal: 20 },
  logoContainer: { alignItems: "center", marginTop: 40 },
  logo: { width: 200, height: 100 },
  inputContainer: { marginBottom: 20, padding: 16 },
  input: {
    backgroundColor: "#F7F8FA",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 14,
    color: "#000000",
    borderWidth: 1,
    borderColor: "#D3D3D3", // Default border color
  },
  inputError: {
    borderColor: "red", // Red border color on error
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginBottom: 16,
  },
  termsContainer: { flexDirection: "row", alignItems: "center", marginLeft: 16, marginBottom:15 },
  checkboxContainer: {
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    padding: 0.1,
    marginRight: 8,
  },
  termsText: { color: "#000", flexShrink: 1, width: 260},
  termsLink: { color: "#088A85" },
  registerButton: {
    backgroundColor: "#088A85",
    borderRadius: 6,
    alignItems: "center",
    paddingVertical: 12,
    width: "90%",
  },
  buttonContainer: {
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingVertical: 10,
  },
  registerButtonText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 16 },
  footer: { marginTop: 20, flexDirection: "row", justifyContent: "center" },
  footerText: { color: "#000" },
  loginLink: { color: "#088A85" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    width: "90%", // Adjust width as needed
    height: "80%", // Height to fit the screen and allow scrolling
    borderRadius: 10,
    overflow: "hidden", // Ensures content doesn't overflow the container
  },
  scrollContainer: {
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding:16
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  closeButton: {
    backgroundColor: "#088A85",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
