import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const logoImg = require("./assets/Group (1).png");
const bebek1 = require("./assets/IMG_4855.jpg");

const transactions = [
  { id: 1, name: "Mark Lee", type: "Transfer", date: "08 December 2024", amount: "-75.000,00", image: require("./assets/Mark.jpeg")},
  { id: 2, name: "Haechan Lee", type: "Topup", date: "08 December 2024", amount: "+75.000,00", image: require("./assets/_.jpeg")},
  { id: 3, name: "Jeno Lee", type: "Transfer", date: "07 December 2024", amount: "-50.000,00", image: require("./assets/_ (2).jpeg")},
  { id: 4, name: "Jaemin Na", type: "Topup", date: "06 December 2024", amount: "+100.000,00", image: require("./assets/_ (3.jpeg")},
];

export default function App() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const toggleBalanceVisibility = () => setIsBalanceVisible((prev) => !prev);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <>
        {/* Main Container */}
        <SafeAreaView
          style={[
            styles.container,
            { backgroundColor: isDarkMode ? "#000000" : "#FAFBFD" },
          ]}
        >
          {/* Header */}
          <View
            style={[
              styles.header,
              {
                backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
              },
            ]}
          >
            <Image source={bebek1} style={styles.profileImage} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.name, { color: isDarkMode ? "#FFFFFF" : "#000000" }]}>Talitha Kayla Amory</Text>
              <Text style={[styles.subTitle, { color: isDarkMode ? "#FFFFFF" : "#000000" }]}>Personal Account</Text>
            </View>
            <TouchableOpacity onPress={toggleDarkMode}>
              {isDarkMode ? (
                <FontAwesome name="moon-o" size={24} color="#808080" />
              ) : (
                <FontAwesome name="sun-o" size={24} color="#FFA500" />
              )}
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContainer}>
            {/* Welcome Section */}
            <View style={{ flex: 1, flexDirection: "row", padding: 16 }}>
              <View style={styles.welcomeSection}>
                <Text style={[styles.greeting, { color: isDarkMode ? "#FFFFFF" : "#000000" }]}>Good Morning, Talitha</Text>
                <Text style={[styles.description, { color: isDarkMode ? "#FFFFFF" : "#000000" }]}>
                  Check all your incoming and outgoing transactions here
                </Text>
              </View>
              <Image source={logoImg} />
            </View>

            {/* Account Info */}
            <View style={styles.accountInfo}>
              <Text style={styles.accountLabel}>Account No.</Text>
              <Text style={[styles.accountLabel, styles.accountNumber]}>100899</Text>
            </View>

            {/* Balance Info */}
            <View style={styles.card}>
              <View>
                <Text style={styles.label}>Balance</Text>
                <View style={styles.balanceContainer}>
                  <Text style={styles.balance}>Rp </Text>
                  <Text style={styles.balance}>
                    {isBalanceVisible ? "10.000.000" : "••••••••"}
                  </Text>
                  <TouchableOpacity onPress={toggleBalanceVisibility} style={styles.eyeButton}>
                    <FontAwesome
                      name={isBalanceVisible ? "eye" : "eye-slash"}
                      size={20}
                      color="#D3D3D3"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.iconButton}>
                  <MaterialIcons name="add" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <MaterialIcons name="send" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Transaction History */}
            <View style={styles.historyBox}>
              <Text style={styles.historyTitle}>Transaction History</Text>
              <View style={styles.divider} />
              {transactions.map((transaction) => (
                <View style={styles.historyItem} key={transaction.id}>
                  <View style={styles.circle}>
                      {/* Dynamically load the image based on the transaction */}
                      <Image
                        source={transaction.image}  // Use the image from the transaction data
                        style={styles.circleImage}
                      />
                    </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.historyName}>{transaction.name}</Text>
                    <Text style={styles.historyType}>{transaction.type}</Text>
                    <Text style={styles.historyDate}>{transaction.date}</Text>
                  </View>
                  <Text
                    style={[
                      styles.historyAmount,
                      transaction.type === "Topup" ? styles.positive : styles.negative,
                    ]}
                  >
                    {transaction.amount}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Bottom Navbar */}
          <View style={[styles.bottomNavbar, { backgroundColor: isDarkMode ? "#000000" : "#FFFFFF" }]}>
          </View>
        </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 20,
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
});

