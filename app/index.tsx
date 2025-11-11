import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import * as Animatable from "react-native-animatable";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();

  const FloatingIcon = ({ name, library, style, animation, duration, delay = 0 }: any) => {
    const IconComponent = library;
    return (
      <Animatable.View animation={animation} iterationCount="infinite" duration={duration} delay={delay} style={[{ position: "absolute" }, style]}>
        <IconComponent name={name} size={40} color="#FFD700" />
      </Animatable.View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      {/* Floating crypto icons */}
      <FloatingIcon name="bitcoin" library={FontAwesome5} style={{ top: 50, left: width * 0.2 }} animation="slideInDown" duration={4000} />
      <FloatingIcon name="ethereum" library={MaterialCommunityIcons} style={{ bottom: 100, right: width * 0.25 }} animation="slideInUp" duration={4500} />
      <FloatingIcon name="dollar-sign" library={FontAwesome5} style={{ top: 150, left: width * 0.6 }} animation="pulse" duration={2000} />
      <FloatingIcon name="pound-sign" library={FontAwesome5} style={{ bottom: 340, left: width * 0.3 }} animation="pulse" duration={2500} />

      {/* Moon (still can use an image for moon) */}
      <Animatable.View animation="slideInDown" duration={1500} style={{ marginBottom: 20 }}>
        <FontAwesome5 name="moon" size={120} color="#FFD700" />
      </Animatable.View>

      {/* App title */}
      <Animatable.Text animation="slideInUp" duration={1500} style={{ fontSize: 36, fontWeight: "bold", color: "#FFD700", marginBottom: 40 }}>
        MoonWallet
      </Animatable.Text>

      {/* Buttons */}
      <Animatable.View animation="fadeInUp" delay={2000} duration={1000} style={{ marginTop: 50 }}>
        <TouchableOpacity onPress={() => router.push("/auth/Login")} style={{ backgroundColor: "#FFD700", paddingVertical: 12, paddingHorizontal: 140, borderRadius: 30, marginBottom: 20 }}>
          <Text style={{ color: "#000", fontWeight: "bold", fontSize: 18 }}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/auth/Register")} style={{ borderColor: "#FFD700", borderWidth: 2, paddingVertical: 12, paddingHorizontal: 130, borderRadius: 30 }}>
          <Text style={{ color: "#FFD700", fontWeight: "bold", fontSize: 18 }}>Register</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
