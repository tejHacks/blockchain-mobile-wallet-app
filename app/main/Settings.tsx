import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function Settings() {
  const router = useRouter();
  const { logout } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<"Notifications" | "Privacy" | "Help" | null>(null);

  // Dummy notification toggles
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  const openModal = (content: "Notifications" | "Privacy" | "Help") => {
    setModalContent(content);
    setModalVisible(true);
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/Login");
  };

  const settingsOptions = [
    {
      icon: <Ionicons name="person-circle-outline" size={22} color="#FFD700" />,
      label: "Account",
      action: () => router.push("/main/Profile"),
    },
    {
      icon: <MaterialIcons name="notifications-none" size={22} color="#FFD700" />,
      label: "Notifications",
      action: () => openModal("Notifications"),
    },
    {
      icon: <Ionicons name="lock-closed-outline" size={22} color="#FFD700" />,
      label: "Privacy",
      action: () => openModal("Privacy"),
    },
    {
      icon: <MaterialIcons name="help-outline" size={22} color="#FFD700" />,
      label: "Help & Support",
      action: () => openModal("Help"),
    },
    {
      icon: <Ionicons name="log-out-outline" size={22} color="#FFD700" />,
      label: "Logout",
      action: handleLogout,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ color: "#FFD700", fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
          Settings
        </Text>

        {settingsOptions.map((opt, i) => (
          <TouchableOpacity key={i} onPress={opt.action} style={styles.optionButton}>
            {opt.icon}
            <Text style={styles.optionText}>{opt.label}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={() => router.replace("/main/Home")} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#FFD700" />
          <Text style={styles.backButtonText}>Back Home</Text>
        </TouchableOpacity>

        {/* ===== MODALS ===== */}
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{modalContent}</Text>

              {modalContent === "Notifications" && (
                <View>
                  <Text style={styles.modalBody}>Manage how you receive updates.</Text>

                  <View style={styles.switchRow}>
                    <Text style={styles.switchLabel}>Push Notifications</Text>
                    <Switch
                      value={pushEnabled}
                      onValueChange={setPushEnabled}
                      thumbColor={pushEnabled ? "#FFD700" : "#444"}
                    />
                  </View>

                  <View style={styles.switchRow}>
                    <Text style={styles.switchLabel}>Email Alerts</Text>
                    <Switch
                      value={emailEnabled}
                      onValueChange={setEmailEnabled}
                      thumbColor={emailEnabled ? "#FFD700" : "#444"}
                    />
                  </View>

                  <Text style={{ color: "#888", marginTop: 15, fontSize: 13 }}>
                    *You’ll still receive important security messages.
                  </Text>
                </View>
              )}

              {modalContent === "Privacy" && (
                <View>
                  <Text style={styles.modalBody}>
                    Your privacy matters. MoonWallet collects minimal data and never sells it.
                    You can manage the data stored locally and request deletion anytime.
                  </Text>
                  <Text style={styles.modalBody}>
                    • End-to-end encryption protects all your wallet transactions.{"\n"}
                    • Location access is only used when you enable regional pricing.{"\n"}
                    • Cached data can be cleared under &quot;App Storage&quot; in your phone settings.
                  </Text>
                </View>
              )}

              {modalContent === "Help" && (
                <View>
                  <Text style={styles.modalBody}>
                    Need support? We’ve got you covered.
                  </Text>
                  <Text style={styles.modalBody}>
                     Email: support@moonwallet.app{"\n"}
                    FAQ: https://moonwallet.help/faq{"\n"}
                    Live chat available 9 AM – 6 PM WAT
                  </Text>
                  <Text style={styles.modalBody}>
                    Tip: Always keep your recovery phrase offline and private.
                  </Text>
                </View>
              )}

              <Pressable
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "#FFD700", fontWeight: "bold" }}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  optionText: { color: "#fff", fontSize: 16, marginLeft: 12 },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222",
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  backButtonText: { color: "#FFD700", marginLeft: 6, fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: { color: "#FFD700", fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  modalBody: { color: "#ccc", fontSize: 15, marginBottom: 10, lineHeight: 22 },
  modalCloseButton: { alignSelf: "flex-end", padding: 10 },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  switchLabel: { color: "#fff", fontSize: 15 },
});
