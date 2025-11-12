import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function ResetPassword() {
  const router = useRouter();
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    console.log("Reset request for:", email);
    if (!email) return Alert.alert("Error", "Please enter your email");

    try {
      await resetPassword(email);
      console.log("✅ Reset link sent!");
      Alert.alert("Success", "Password reset email sent!");
      router.push("../auth/Login" as any);
    } catch (err: any) {
      console.error("❌ Reset error:", err);
      Alert.alert("Error", err.message || "Something went wrong");
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
        Reset Password
      </Text>

      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
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
        onPress={handleReset}
        style={{
          width: "100%",
          padding: 16,
          borderRadius: 12,
          backgroundColor: "#FFD700",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>
          Send Reset Link
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("../auth/Login" as any)}>
        <Text style={{ color: "#FFD700", marginTop: 20 }}>Back to Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
