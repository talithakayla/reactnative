import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Toast from "react-native-toast-message";
import { login } from "../api/restApi"; // Import the login API function
import { useAuth } from "../contexts/AuthContext"; // Import AuthContext
import AsyncStorage from "@react-native-async-storage/async-storage";

// Custom Success Toast Layout
const CustomToast = ({ text1, text2 }) => {
  return (
    <View style={styles.toastContainer}>
      <View style={styles.toastIconContainer}>
        <Image
          source={require("../assets/success.png")}
          style={styles.toastIcon}
        />
      </View>
      <View style={styles.toastTextContainer}>
        <Text style={styles.toastTitle}>{text1}</Text>
        <Text style={styles.toastSubtitle}>{text2}</Text>
      </View>
    </View>
  );
};

export default function LoginPage({ navigation }) {
  const { loginAuth } = useAuth(); // Extract login function from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async () => {
    let valid = true;

    // Reset error messages
    setEmailError("");
    setPasswordError("");

    // Validate email
    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!email.includes("@")) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    }

    if (valid) {
      try {
        //const response = await login(email, password); // Call API login
        //console.log("Ini response" + response.data.token);
        //AsyncStorage.setItem("userToken", response.data.token); // Save token in AuthContext

        // Show success toast and navigate to main app
        loginAuth(email, password).then(() => {
          Toast.show({
            type: "success",
            text1: "Login Successful",
            text2: "Welcome back!",
            position: "top",
            visibilityTime: 1500,
            topOffset: 50,
          });
        });

        setTimeout(() => {
          navigation.navigate("MainTabs");
        }, 1500);
      } catch (error) {
        console.log(error.message);
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: error.message || "Something went wrong.",
          position: "top",
          visibilityTime: 2000,
          topOffset: 50,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          {/* Toast Component */}
          <Toast config={{ success: (props) => <CustomToast {...props} /> }} />

          {/* Logo Section */}
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
              style={[styles.input, emailError && styles.inputError]}
              placeholder="Email"
              placeholderTextColor="black"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}

            <TextInput
              style={[styles.input, passwordError && styles.inputError]}
              placeholder="Password"
              placeholderTextColor="black"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>

          {/* Login Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>

          {/* Register Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.registerLink}>Register here</Text>
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
  inputError: {
    borderColor: "red",
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginBottom: 16,
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

  // Toast Styles
  toastContainer: {
    backgroundColor: "#FFFFFF",
    borderLeftWidth: 6,
    borderLeftColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginHorizontal: 16,
  },
  toastIconContainer: {
    backgroundColor: "#E0F2E9",
    borderRadius: 50,
    padding: 8,
    marginRight: 12,
  },
  toastIcon: {
    width: 24,
    height: 24,
  },
  toastTextContainer: {
    flex: 1,
  },
  toastTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  toastSubtitle: {
    fontSize: 14,
    color: "#666666",
  },
});
