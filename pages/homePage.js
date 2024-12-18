import { StyleSheet, View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { fetchPosts, fetchTransactions } from "../api/restApi";
import Toast from "react-native-toast-message";

const logoImg = require("../assets/Group (1).png");
const defaultProfileImage = require("../assets/IMG_4855.jpg"); // Replace with your default image

import { useAuth } from "../contexts/AuthContext";

export default function HomePage({ navigation }) {
  const { logout } = useAuth();

  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [user, transactionData] = await Promise.all([fetchPosts(), fetchTransactions()]);
      setUserData(user);
      setTransactions(transactionData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on initial render
  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle refresh
  const onRefresh = async () => {
    setRefreshing(true); // Set refreshing to true
    await fetchData(); // Fetch updated data
    setRefreshing(false); // Reset refreshing to false
  };

  // Fetch user data and transactions
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [user, transactionData] = await Promise.all([fetchPosts(), fetchTransactions()]);
        setUserData(user);
        setTransactions(transactionData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);

  // Sign out handler
  const handleSignOut = async () => {
    try {
      setIsDropdownVisible(false);
      await logout();
      navigation.navigate("Login");
      Toast.show({
        type: "success",
        text1: "Logged out",
        text2: "You have been successfully logged out.",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Logout failed",
        text2: "An error occurred while logging out. Please try again.",
      });
      console.error("Error during logout:", error);
    }
  };

  // If loading data, show ActivityIndicator
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  // If error occurs, show error message
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? "#000000" : "#FAFBFD" }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDarkMode ? "#000000" : "#FFFFFF" }]}>
        <TouchableOpacity onPress={toggleDropdown}>
          <Image source={defaultProfileImage} style={styles.profileImage} />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text style={[styles.name, { color: isDarkMode ? "#FFFFFF" : "#000000" }]}>
            {userData ? userData.full_name : "Loading..."}
          </Text>
          <Text style={[styles.subTitle, { color: isDarkMode ? "#FFFFFF" : "#000000" }]}>
            Personal Account
          </Text>
        </View>

        <TouchableOpacity onPress={() => setIsDarkMode((prev) => !prev)}>
          {isDarkMode ? (
            <FontAwesome name="moon-o" size={24} color="#808080" />
          ) : (
            <FontAwesome name="sun-o" size={24} color="#FFA500" />
          )}
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      {isDropdownVisible && (
        <TouchableOpacity
          style={styles.dropdownOverlay}
          onPress={() => setIsDropdownVisible(false)}
        >
          <View style={styles.dropdownMenu}>
            <View style={styles.speechBubbleTail} />
            <TouchableOpacity style={styles.dropdownItemContainer} onPress={handleSignOut}>
              <Icon name="logout" size={24} color="black" />
              <Text style={styles.dropdownItem}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}

      {/* Rest of the UI */}
      <ScrollView style={styles.scrollContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {/* Welcome Section */}
        <View style={{ flex: 1, flexDirection: "row", padding: 16 }}>
          <View style={styles.welcomeSection}>
            <Text style={[styles.greeting, { color: isDarkMode ? "#FFFFFF" : "#000000" }]}>
              Good Morning, {userData ? userData.full_name : "User"}
            </Text>
            <Text style={[styles.description, { color: isDarkMode ? "#FFFFFF" : "#000000" }]}>
              Check all your incoming and outgoing transactions here
            </Text>
          </View>
          <Image source={logoImg} />
        </View>

        {/* Account Info */}
        <View style={styles.accountInfo}>
            <Text style={styles.accountLabel}>Account No.</Text>
            <Text style={[styles.accountLabel, styles.accountNumber]}>{userData.account_no}</Text>
          </View>

        {/* Balance Info */}
        <View style={styles.card}>
          <View>
            <Text style={styles.label}>Balance</Text>
            <View style={styles.balanceContainer}>
              <Text style={styles.balance}>Rp </Text>
              <Text style={styles.balance}>
                {isBalanceVisible ? (userData ? userData.balance : "Loading...") : "••••••••"}
              </Text>
              <TouchableOpacity onPress={() => setIsBalanceVisible(prev => !prev)} style={styles.eyeButton}>
                <FontAwesome name={isBalanceVisible ? "eye" : "eye-slash"} size={20} color="#D3D3D3" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate("TopUp")} // Route to TopUp Page
            >
              <MaterialIcons name="add" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate("Transfer")} // Route to Transfer Page
            >
              <MaterialIcons name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Transaction History */}
<View style={styles.historyBox}>
  <Text style={styles.historyTitle}>Transaction History</Text>
  <View style={styles.divider} />
  
  <ScrollView contentContainerStyle={{ paddingBottom: 10 }} showsVerticalScrollIndicator={false}>
    {transactions.map((transaction) => {
      const transactionType = transaction.type === "c" ? "Topup" : "Transfer";
      const transactionAmount =
        transaction.type === "c"
          ? `+${transaction.amount.toLocaleString()}`
          : `-${transaction.amount.toLocaleString()}`;
      const amountStyle = transaction.type === "c" ? styles.positive : styles.negative;

      return (
        <View key={transaction.id.toString()} style={styles.historyItem}>
          <View style={styles.circle}>
            <Image
              source={defaultProfileImage} // Replace with actual transaction images if available
              style={styles.circleImage}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.historyName}>{transaction.from_to}</Text>
            <Text style={styles.historyType}>{transactionType}</Text>
            <Text style={styles.historyDate}>
              {new Date(transaction.created_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Text>
          </View>
          <Text style={[styles.historyAmount, amountStyle]}>{transactionAmount}</Text>
        </View>
      );
    })}
  </ScrollView>
</View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 80,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  subTitle: {
    fontSize: 14,
    color: "#000000",
  },
  welcomeSection: {
    flex: 1,
    marginRight: 30,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    color: "black",
    fontSize: 16,
    marginTop: 16,
  },
  accountInfo: {
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    backgroundColor: "#19918F",
    justifyContent: "space-between",
    margin: 16,
  },
  accountLabel: {
    color: "white",
  },
  accountNumber: {
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    margin: 16,
  },
  label: {
    fontSize: 16,
    color: "black",
    marginBottom: 4,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  balance: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  eyeButton: {
    marginLeft: 8,
  },
  buttonContainer: {
    justifyContent: "space-between",
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: "#19918F",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 7,
    shadowColor: "#19918F",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8, 
    shadowRadius: 5, 
    elevation: 8, 
  },
  historyBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    margin: 16,
    height: 350, // Adjust height as needed
  },   
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginVertical: 12,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 12,
  },
  circleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  historyName: {
    fontSize: 16,
    color: "#333",
  },
  historyType: {
    fontSize: 14,
    color: "#000000",
  },
  historyDate: {
    fontSize: 12,
    color: "#C0C0C0",
  },
  historyAmount: {
    fontSize: 16,
    marginLeft: 12,
  },
  positive: {
    color: "lightgreen",
  },
  negative: {
    color: "black",
  },
  bottomNavbar: {
    position: 'absolute', 
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#00000', 
    shadowOffset: { width: 0, height: -2 }, 
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100, // Ensure the overlay stays above other components
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Optional: Dim background for focus
  },
  dropdownMenu: {
    position: "absolute",
    top: 130, // Adjust this to align below your profile image
    marginLeft: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 8,
    zIndex: 101,
  },
  
  dropdownItemContainer: {
    flexDirection: "row", // Horizontal layout for icon and text
    alignItems: "center", // Align items vertically centered
    padding: 8, // Add some padding for spacing
  },
  
  dropdownItem: {
    marginLeft: 8, // Add spacing between the icon and the text
    fontSize: 16,
    color: "black",
  },
  speechBubbleTail: {
    position: "absolute",
    top: -10, // Tail above the menu
    left: "10%",
    // transform: [{ translateX: -10 }],
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#FFFFFF",
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  postContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
    color: '#555',
  },
  accountInfo: {
    padding: 16,
    backgroundColor: "#f7f7f7",
    marginBottom: 16,
    borderRadius: 8,
  },
  accountInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  accountInfoItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  accountInfoLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
    color: "#555",
  },
  accountInfoValue: {
    fontSize: 14,
    color: "#333",
  },
  accountInfo: {
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    backgroundColor: "#19918F",
    justifyContent: "space-between",
    margin: 16,
  },
  accountLabel: {
    color: "white",
  },
  accountNumber: {
    fontWeight: "bold",
  },
});

        


  

  