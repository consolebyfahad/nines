import CustomButton from "@/components/CustomButton";
import { color } from "@/constants/Colors";
import { svgIcon } from "@/constants/Images";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Forget() {
  const Logo = svgIcon.Logo;

  const [email, setEmail] = useState("");

  const handleSendResetLink = () => {
    if (!email) {
      console.log("Please enter your email address");
      return;
    }
    console.log("Sending reset link to:", email);
    // Here you would typically call your API to send reset email
  };

  const handleBackToLogin = () => {
    router.back(); // Go back to the previous screen (AuthScreen)
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
        <Ionicons name="arrow-back" size={24} color={color.black} />
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      {/* Title */}
      <Text style={styles.title}>Forgot Password?</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        {` Don't worry! It happens. Please enter the email address associated with
        your account.`}
      </Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Send Reset Link Button */}
      <CustomButton
        title="Send Reset Link"
        onPress={handleSendResetLink}
        variant="primary"
        customStyle={styles.resetLink}
      />

      {/* Back to Login Link */}
      <View style={styles.backToLoginContainer}>
        <Text style={styles.backToLoginText}>Remember your password? </Text>
        <TouchableOpacity onPress={handleBackToLogin}>
          <Text style={styles.backToLoginLink}>Back to Login</Text>
        </TouchableOpacity>
      </View>

      {/* Help Text */}
      <View style={styles.helpContainer}>
        <Text style={styles.helpText}>
          {`We'll send you an email with instructions to reset your password.`}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: color.white,
    paddingHorizontal: 32,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: "Bold",
    color: color.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: color.black,
    marginBottom: 40,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    height: 56,
    backgroundColor: color.secondary100,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: color.black,
  },
  resetLink: {
    alignItems: "center",
  },
  backToLoginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 32,
  },
  backToLoginText: {
    fontSize: 14,
    color: color.black,
    fontFamily: "Regular",
  },
  backToLoginLink: {
    fontSize: 14,
    color: color.primary,
    fontFamily: "SemiBold",
  },
  helpContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  helpText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "Regular",
  },
});
