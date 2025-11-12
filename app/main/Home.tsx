import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Constants from "expo-constants";

export default function Home() {
  const router = useRouter();
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dummyCoins = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", price: "$68,300" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", price: "$3,250" },
    { id: "solana", name: "Solana", symbol: "SOL", price: "$160" },
  ];

  const API_KEY = Constants.expoConfig?.extra?.CG_API_KEY || process.env.CG_API_KEY;

  const fetchCoins = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h",
        {
          headers: {
            "Content-Type": "application/json",
            "X-CoinGecko-API-Key": API_KEY,
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const formatted = data.map((coin: any) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        price: `$${coin.current_price.toLocaleString()}`,
      }));

      setCoins(formatted);
      await AsyncStorage.setItem("coins", JSON.stringify(formatted));
    } catch (err: any) {
      console.error("❌ Fetch coins error:", err);
      setError("Failed to fetch live coins, using cached data if available.");
      const cached = await AsyncStorage.getItem("coins");
      if (cached) setCoins(JSON.parse(cached));
      else setCoins(dummyCoins);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const handleCoinPress = (coinId: string) => {
    router.push(`./CoinDetail?coinId=${coinId}` as any);
  };

  const renderCoin = ({ item }: any) => (
    <TouchableOpacity onPress={() => handleCoinPress(item.id)}>
      <View
        style={{
          backgroundColor: "#111",
          padding: 16,
          marginVertical: 8,
          borderRadius: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#FFD700", fontSize: 18, fontWeight: "600" }}>
          {item.name} ({item.symbol})
        </Text>
        <Text style={{ color: "#fff", fontSize: 16 }}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const navigateTo = (screen: string) => router.push(`../main/${screen}` as any);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000", paddingTop: StatusBar.currentHeight || 40 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#FFD700", fontSize: 28, fontWeight: "bold" }}>MoonWallet</Text>
        <TouchableOpacity onPress={() => Alert.alert("Notifications coming soon!")}>
          <Ionicons name="notifications-outline" size={26} color="#FFD700" />
        </TouchableOpacity>
      </View>

      {/* Coins Section */}
      {loading ? (
        <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 50 }} />
      ) : error ? (
        <Text style={{ color: "red", textAlign: "center", marginHorizontal: 20, marginBottom: 10 }}>
          {error}
        </Text>
      ) : null}

      <FlatList
        data={coins}
        keyExtractor={(item) => item.id}
        renderItem={renderCoin}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      />

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
