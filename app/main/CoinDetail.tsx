import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function CoinDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const coinId = params.coinId as string;

  const [coin, setCoin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<{ value: number; index: number } | null>(null);
  const fadeAnim = new Animated.Value(0);

  const API_KEY = Constants.expoConfig?.extra?.CG_API_KEY || process.env.CG_API_KEY;

  const fetchCoinDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`,
        { headers: { "Content-Type": "application/json", "X-CoinGecko-API-Key": API_KEY } }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const coinData = {
        id: data.id,
        name: data.name,
        symbol: data.symbol.toUpperCase(),
        price: `$${data.market_data.current_price.usd.toLocaleString()}`,
        marketCap: `$${data.market_data.market_cap.usd.toLocaleString()}`,
        volume24h: `$${data.market_data.total_volume.usd.toLocaleString()}`,
        change24h: `${data.market_data.price_change_percentage_24h.toFixed(2)}%`,
        sparkline: data.market_data.sparkline_7d?.price || [],
      };

      setCoin(coinData);
      await AsyncStorage.setItem(`coin_${coinId}`, JSON.stringify(coinData));
    } catch (err: any) {
      console.error("Fetch coin detail error:", err);
      setError("Failed to fetch live data. Using cache if available.");
      const cached = await AsyncStorage.getItem(`coin_${coinId}`);
      if (cached) setCoin(JSON.parse(cached));
      else setCoin(null);
    } finally {
      setLoading(false);
    }
  }, [coinId, API_KEY]);

  useEffect(() => {
    fetchCoinDetails();
  }, [fetchCoinDetails]);

  const handleSaveCoin = async () => {
    if (!coin) return;
    try {
      const savedCoins = await AsyncStorage.getItem("savedCoins");
      const saved = savedCoins ? JSON.parse(savedCoins) : [];
      if (!saved.find((c: any) => c.id === coin.id)) {
        saved.push(coin);
        await AsyncStorage.setItem("savedCoins", JSON.stringify(saved));
        alert("Coin saved!");
      } else {
        alert("Coin already saved.");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to save coin.");
    }
  };

  const handleBuyCoin = () => {
    alert(`Buying ${coin?.name}...`);
  };

  const showTooltip = (value: number, index: number) => {
    setSelectedPoint({ value, index });
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.delay(2000),
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FFD700" />
      </SafeAreaView>
    );
  }

  if (!coin) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={{ color: "red", textAlign: "center" }}>{error || "Coin data not available."}</Text>
        <TouchableOpacity
          onPress={() => router.replace("/main/Home")}
          style={{ marginTop: 20, flexDirection: "row", alignItems: "center" }}
        >
          <Ionicons name="arrow-back" size={20} color="#FFD700" />
          <Text style={{ color: "#FFD700", fontSize: 18, marginLeft: 6 }}>Back Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const labels = coin.sparkline.map((_: number, i: number) => (i % 5 === 0 ? `${i}` : ""));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        <Text style={{ color: "#FFD700", fontSize: 28, fontWeight: "bold", marginBottom: 8 }}>
          {coin.name} ({coin.symbol})
        </Text>
        <Text style={{ color: "#fff", fontSize: 24, marginBottom: 12 }}>{coin.price}</Text>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ color: "#ccc", fontSize: 16 }}>Market Cap: {coin.marketCap}</Text>
          <Text style={{ color: "#ccc", fontSize: 16 }}>24h Volume: {coin.volume24h}</Text>
          <Text style={{ color: "#ccc", fontSize: 16 }}>24h Change: {coin.change24h}</Text>
        </View>

        {coin.sparkline.length > 0 ? (
          <View>
            <LineChart
              data={{ labels, datasets: [{ data: coin.sparkline }] }}
              width={width - 40}
              height={260}
              yAxisLabel="$"
              chartConfig={{
                backgroundGradientFrom: "#0D0D0D",
                backgroundGradientTo: "#1A1A1A",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForDots: { r: "3", strokeWidth: "1", stroke: "#FFD700" },
                propsForBackgroundLines: { stroke: "#333" },
              }}
              bezier
              style={{ borderRadius: 16, marginTop: 20 }}
              onDataPointClick={(data) => showTooltip(data.value, data.index)}
            />
            {selectedPoint && (
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  backgroundColor: "#1A1A1A",
                  padding: 10,
                  borderRadius: 10,
                  position: "absolute",
                  top: 30,
                  left: width / 4,
                }}
              >
                <Text style={{ color: "#FFD700", fontWeight: "bold" }}>
                  ${selectedPoint.value.toFixed(2)}
                </Text>
                <Text style={{ color: "#ccc", fontSize: 12 }}>
                  Point {selectedPoint.index + 1}
                </Text>
              </Animated.View>
            )}
          </View>
        ) : (
          <Text style={{ color: "#ccc", marginTop: 20 }}>No chart data available</Text>
        )}

        {/* Action Buttons */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
          <TouchableOpacity
            onPress={() => router.replace("/main/Home")}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#444",
              padding: 14,
              borderRadius: 12,
              marginRight: 8,
            }}
          >
            <Ionicons name="arrow-back" size={20} color="#FFD700" />
            <Text style={{ color: "#FFD700", marginLeft: 6, fontWeight: "bold" }}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSaveCoin}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#222",
              padding: 14,
              borderRadius: 12,
              marginHorizontal: 8,
            }}
          >
            <FontAwesome5 name="save" size={20} color="#00FF00" />
            <Text style={{ color: "#00FF00", marginLeft: 6, fontWeight: "bold" }}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleBuyCoin}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#222",
              padding: 14,
              borderRadius: 12,
              marginLeft: 8,
            }}
          >
            <MaterialIcons name="shopping-cart" size={20} color="#00BFFF" />
            <Text style={{ color: "#00BFFF", marginLeft: 6, fontWeight: "bold" }}>Buy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
