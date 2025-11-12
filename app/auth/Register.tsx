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

export default function Register() {
  const router = useRouter();
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    console.log("Attempting to register:", email);

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await register(email, password);
      console.log("✅ Registration successful!");
      router.push("../auth/Login" as any);
    } catch (err: any) {
      console.error("❌ Registration error:", err);
      Alert.alert("Registration Failed", err.message || "Something went wrong");
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
        Register
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

      {/* Password */}
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

      {/* Confirm Password */}
      <View
        style={{
          width: "100%",
          marginBottom: 30,
          borderRadius: 10,
          backgroundColor: "#111",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#ccc"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          style={{
            flex: 1,
            padding: 16,
            color: "#fff",
          }}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Feather
            name={showConfirmPassword ? "eye-off" : "eye"}
            size={22}
            color="#FFD700"
          />
        </TouchableOpacity>
      </View>

      {/* Register button */}
      <TouchableOpacity
        onPress={handleRegister}
        style={{
          width: "100%",
          padding: 16,
          borderRadius: 12,
          backgroundColor: "#FFD700",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>
          Register
        </Text>
      </TouchableOpacity>

      {/* Go to Login */}
      <TouchableOpacity
        onPress={() => router.push("../auth/Login" as any)}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "#FFD700" }}>
          Already have an account?{" "}
          <Text style={{ fontWeight: "bold" }}>Login</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
