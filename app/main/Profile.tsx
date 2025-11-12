import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const router = useRouter();
  const { user } = useContext(AuthContext); // get the current logged-in user
  const [savedCoins, setSavedCoins] = useState<any[]>([]);

  useEffect(() => {
    const loadSavedCoins = async () => {
      const coins = await AsyncStorage.getItem("savedCoins");
      setSavedCoins(coins ? JSON.parse(coins) : []);
    };
    loadSavedCoins();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        <Text style={{ color: "#FFD700", fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>Profile</Text>

        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <Ionicons name="person-circle-outline" size={100} color="#FFD700" />
          <Text style={{ color: "#fff", fontSize: 22, marginTop: 10 }}>
            {user?.email ? user.email.split("@")[0] : "User"}
          </Text>
          <Text style={{ color: "#ccc", fontSize: 16 }}>
            {user?.email || "No email found"}
          </Text>
        </View>

        <Text style={{ color: "#FFD700", fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>Saved Coins</Text>
        {savedCoins.length === 0 ? (
          <Text style={{ color: "#ccc" }}>No coins saved yet.</Text>
        ) : (
          savedCoins.map((coin, i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#111",
                padding: 12,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: "#FFD700" }}>{coin.name} ({coin.symbol})</Text>
              <Text style={{ color: "#fff" }}>{coin.price}</Text>
            </View>
          ))
        )}

        <TouchableOpacity
          onPress={() => router.replace("/main/Home")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#222",
            padding: 14,
            borderRadius: 12,
            marginTop: 20,
          }}
        >
          <Ionicons name="arrow-back" size={20} color="#FFD700" />
          <Text style={{ color: "#FFD700", marginLeft: 6, fontWeight: "bold" }}>Back Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
