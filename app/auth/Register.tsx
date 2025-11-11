import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const router = useRouter();
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await register(email, password);
    } catch (err: any) {
      Alert.alert("Registration Failed", err.message || "Something went wrong");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24, backgroundColor: "#000" }}
    >
      <Text style={{ fontSize: 32, color: "#FFD700", marginBottom: 40, fontWeight: "bold" }}>Register</Text>

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

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#ccc"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={{
          width: "100%",
          padding: 16,
          marginBottom: 30,
          borderRadius: 10,
          backgroundColor: "#111",
          color: "#fff",
        }}
      />

      <TouchableOpacity
        onPress={handleRegister}
        style={{ width: "100%", padding: 16, borderRadius: 12, backgroundColor: "#FFD700", alignItems: "center" }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>Register</Text>
      </TouchableOpacity>

      {/* Go to Login */}
      <TouchableOpacity onPress={() => router.push("/auth/Login")}>
        <Text style={{ color: "#FFD700", marginTop: 20 }}>
          Already have an account? <Text style={{ fontWeight: "bold" }}>Login</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
