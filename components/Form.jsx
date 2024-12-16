import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";

export default function FormComponent({ state }) {
  console.log('state nya adalah: ', state);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');
  
  // Handle form submission based on the state (register or login)
  const handleFormSubmit = () => {
    console.log(state === "register" ? "Registering..." : "Logging in...");
    // Add additional form handling logic (validation, API requests, etc.)
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/wallet.png")} // Add your logo in the assets folder
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Form Fields Section */}
      <View style={styles.inputContainer}>
        {state === 'register' && (
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          autoCorrect={false}
          inputMode="numeric"
          autoCapitalize="none"
        />

        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="Notes"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Form Submit Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleFormSubmit}
        >
          <Text style={styles.loginButtonText}>
            {state === "login" ? "Login" : "Register"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer with Register Link */}
      {state === "login" && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don’t have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.registerLink}>Register here</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 100,
  },
  inputContainer: {
    marginBottom: 24,
    padding: 16,
  },
  input: {
    backgroundColor: "#F7F8FA",
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#000000",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 8,
  },
  notesInput: {
    height: 100,
  },
  loginButton: {
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
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: "black",
  },
  registerLink: {
    fontSize: 14,
    color: "#088A85",
  },
});
