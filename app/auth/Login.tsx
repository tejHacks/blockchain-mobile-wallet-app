import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    console.log("Attempting login with:", email);
    try {
      await login(email, password);
      console.log("✅ Login successful!");
      router.push("../main/Home" as any);
    } catch (err: any) {
      console.error("❌ Login error:", err);
      Alert.alert("Login Failed", err.message || "Something went wrong");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#000",
      }}
    >
      <Text
        style={{
          fontSize: 32,
          color: "#FFD700",
          marginBottom: 40,
          fontWeight: "bold",
        }}
      >
        Login
      </Text>

      {/* Email */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          width: "100%",
          padding: 16,
          marginBottom: 20,
          borderRadius: 10,
          backgroundColor: "#111",
          color: "#fff",
        }}
      />

      {/* Password with visibility toggle */}
      <View
        style={{
          width: "100%",
          marginBottom: 20,
          borderRadius: 10,
          backgroundColor: "#111",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          placeholder="Password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={{
            flex: 1,
            padding: 16,
            color: "#fff",
          }}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#FFD700"
          />
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          width: "100%",
          padding: 16,
          borderRadius: 12,
          backgroundColor: "#FFD700",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>
          Login
        </Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity
        onPress={() => router.push("../auth/ResetPassword" as any)}
      >
        <Text style={{ color: "#FFD700", marginTop: 20 }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      {/* Go to Register */}
      <TouchableOpacity
        onPress={() => router.push("../auth/Register" as any)}
        style={{ marginTop: 10 }}
      >
        <Text style={{ color: "#FFD700" }}>
          Don’t have an account?{" "}
          <Text style={{ fontWeight: "bold" }}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
