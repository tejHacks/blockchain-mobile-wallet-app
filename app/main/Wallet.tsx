import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Wallet() {
  const router = useRouter();
  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState<"deposit" | "withdraw">("deposit");

  // Load balance on mount
  useEffect(() => {
    const loadBalance = async () => {
      try {
        const stored = await AsyncStorage.getItem("balance");
        if (stored) {
          setBalance(parseFloat(stored));
          console.log("💵 Loaded balance:", stored);
        } else {
          console.log("⚠️ No balance found, starting from 0");
        }
      } catch (err) {
        console.error("❌ Error loading balance:", err);
      }
    };
    loadBalance();
  }, []);

  const saveBalance = async (newBalance: number) => {
    try {
      await AsyncStorage.setItem("balance", newBalance.toString());
      console.log("✅ Balance saved:", newBalance);
    } catch (err) {
      console.error("❌ Error saving balance:", err);
    }
  };

  const handleTransaction = async () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      Alert.alert("Invalid amount", "Please enter a valid number");
      return;
    }

    if (mode === "deposit") {
      if (amt > 5000) {
        Alert.alert("Limit Exceeded", "Max deposit is $5000");
        return;
      }
      const newBalance = balance + amt;
      setBalance(newBalance);
      await saveBalance(newBalance);
      console.log(`💰 Deposited $${amt}`);
      Alert.alert("Deposit Successful", `You deposited $${amt}`);
    } else {
      if (amt > balance) {
        Alert.alert("Insufficient Funds", "You don't have enough balance");
        return;
      }
      const newBalance = balance - amt;
      setBalance(newBalance);
      await saveBalance(newBalance);
      console.log(`💸 Withdrew $${amt}`);
      Alert.alert("Withdrawal Successful", `You withdrew $${amt}`);
    }

    setAmount("");
    setModalVisible(false);
  };

  const openModal = (type: "deposit" | "withdraw") => {
    setMode(type);
    setModalVisible(true);
  };

  const navigateTo = (screen: string) => {
    router.push(`../main/${screen}` as any);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#000",
        paddingTop: StatusBar.currentHeight || 40,
        paddingHorizontal: 20,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <Text style={{ color: "#FFD700", fontSize: 28, fontWeight: "bold" }}>
          My Wallet
        </Text>
        <TouchableOpacity onPress={() => alert("Transaction history coming soon!")}>
          <Ionicons name="time-outline" size={26} color="#FFD700" />
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <View
        style={{
          backgroundColor: "#111",
          borderRadius: 16,
          padding: 30,
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <Text style={{ color: "#888", fontSize: 16 }}>Current Balance</Text>
        <Text style={{ color: "#FFD700", fontSize: 42, fontWeight: "bold", marginTop: 10 }}>
          ${balance.toFixed(2)}
        </Text>
      </View>

      {/* Buttons */}
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity
          onPress={() => openModal("deposit")}
          style={{
            backgroundColor: "#FFD700",
            paddingVertical: 14,
            paddingHorizontal: 30,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#000", fontWeight: "bold", fontSize: 18 }}>Deposit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openModal("withdraw")}
          style={{
            backgroundColor: "#222",
            borderWidth: 1,
            borderColor: "#FFD700",
            paddingVertical: 14,
            paddingHorizontal: 30,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#FFD700", fontWeight: "bold", fontSize: 18 }}>
            Withdraw
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.7)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "#111",
              padding: 24,
              borderRadius: 16,
            }}
          >
            <Text style={{ color: "#FFD700", fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
              {mode === "deposit" ? "Deposit Funds" : "Withdraw Funds"}
            </Text>

            <TextInput
              placeholder="Enter amount"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: 14,
                borderRadius: 10,
                marginBottom: 20,
              }}
            />

            <TouchableOpacity
              onPress={handleTransaction}
              style={{
                backgroundColor: "#FFD700",
                paddingVertical: 14,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#000", fontWeight: "bold", fontSize: 18 }}>
                Confirm
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ marginTop: 16, alignItems: "center" }}
            >
              <Text style={{ color: "#FFD700" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navbar */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#111",
          paddingVertical: 12,
          borderTopWidth: 1,
          borderColor: "#222",
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <TouchableOpacity onPress={() => navigateTo("Home")}>
          <FontAwesome5 name="home" size={22} color="#FFD700" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateTo("Wallet")}>
          <MaterialCommunityIcons name="wallet" size={26} color="#FFD700" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateTo("Profile")}>
          <FontAwesome5 name="user" size={22} color="#FFD700" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateTo("Settings")}>
          <Ionicons name="settings-outline" size={24} color="#FFD700" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
