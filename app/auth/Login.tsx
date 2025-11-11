import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (err: any) {
      Alert.alert("Login Failed", err.message || "Something went wrong");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24, backgroundColor: "#000" }}
    >
      <Text style={{ fontSize: 32, color: "#FFD700", marginBottom: 40, fontWeight: "bold" }}>Login</Text>

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

      <TextInput
        placeholder="Password"
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          width: "100%",
          padding: 16,
          marginBottom: 20,
          borderRadius: 10,
          backgroundColor: "#111",
          color: "#fff",
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{ width: "100%", padding: 16, borderRadius: 12, backgroundColor: "#FFD700", alignItems: "center" }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => router.push("/auth/ResetPassword")}>
        <Text style={{ color: "#FFD700", marginTop: 20 }}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Go to Register */}
      <TouchableOpacity onPress={() => router.push("/auth/Register")}>
        <Text style={{ color: "#FFD700", marginTop: 10 }}>
          Don’t have an account? <Text style={{ fontWeight: "bold" }}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
