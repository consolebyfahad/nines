import CustomButton from "@/components/CustomButton";
import { color } from "@/constants/Colors";
import { svgIcon } from "@/constants/Images";
import Octicons from "@expo/vector-icons/Octicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AuthScreen() {
  const router = useRouter();
  const Logo = svgIcon.Logo;
  const Apple = svgIcon.Apple;
  const Google = svgIcon.Google;

  // State to manage signup/login mode
  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePrimaryAction = () => {
    if (isSignup) {
      router.push("/home/home");
      console.log("Create account pressed");
    } else {
      router.push("/home/home");
      console.log("Login pressed");
    }
  };

  const handleForgotPassword = () => {
    router.push("/auth/forget");
    console.log("Forgot password pressed");
  };

  const handleAlternateAction = () => {
    // Toggle between signup and login modes
    setIsSignup(!isSignup);

    // Reset form fields when switching modes
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRememberMe(false);
    setAgreeToTerms(false);
    setShowPassword(false);
    setShowConfirmPassword(false);

    if (isSignup) {
      console.log("Switch to Sign In");
    } else {
      console.log("Switch to Sign Up");
    }
  };

  const handleAppleLogin = () => {
    console.log("Apple login pressed");
  };

  const handleGoogleLogin = () => {
    console.log("Google login pressed");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      {/* Title */}
      <Text style={styles.title}>
        {isSignup ? "Welcome 👋" : "Welcome Back 👋"}
      </Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        {isSignup
          ? "Hello there, Create a new account"
          : "Hello there, sign in to continue"}
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

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A0A0A0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Octicons
            name={showPassword ? "eye-closed" : "eye"}
            size={24}
            color={color.gray}
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Input - Only for Signup */}
      {isSignup && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#A0A0A0"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Octicons
              name={showConfirmPassword ? "eye-closed" : "eye"}
              size={24}
              color={color.gray}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Remember Me & Forgot Password - Only for Login */}
      {!isSignup && (
        <View style={styles.rememberContainer}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View
              style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
            >
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Terms Agreement - Only for Signup */}
      {isSignup && (
        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            <View
              style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}
            >
              {agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
          </TouchableOpacity>
          <View style={styles.termsTextContainer}>
            <Text style={styles.termsText}>{`I'm agree to `}</Text>
            <TouchableOpacity>
              <Text style={styles.termsLink}>The Terms of Service</Text>
            </TouchableOpacity>
            <Text style={styles.termsText}> and </Text>

            <TouchableOpacity>
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Primary Action Button */}

      <CustomButton
        title={isSignup ? "Create Account" : "Login"}
        onPress={handlePrimaryAction}
        variant="primary"
      />

      {/* Alternate Action Link */}
      <View style={styles.alternateContainer}>
        <Text style={styles.alternateText}>
          {isSignup ? "Do you have account? " : "Don't have account? "}
        </Text>
        <TouchableOpacity onPress={handleAlternateAction}>
          <Text style={styles.alternateLink}>
            {isSignup ? "Sign In" : "Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Or Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider}></View>
        <Text style={styles.orText}>Or</Text>
        <View style={styles.divider}></View>
      </View>

      {/* Social Login Buttons */}
      <View style={styles.socialContainer}>
        <CustomButton
          title={"Apple"}
          variant="secondary"
          icon={Apple}
          customStyle={{ width: "49%" }}
          onPress={handleAppleLogin}
        />
        <CustomButton
          title={"Google"}
          variant="secondary"
          icon={Google}
          customStyle={{ width: "49%" }}
          onPress={handleGoogleLogin}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: color.white,
    paddingHorizontal: 32,
    paddingTop: 90,
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
  },
  subtitle: {
    fontSize: 16,
    color: color.black,
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 20,
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
  eyeButton: {
    position: "absolute",
    right: 16,
    top: 18,
  },
  eyeIcon: {
    fontSize: 20,
    opacity: 0.6,
  },
  rememberContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: color.white,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.secondary100,
  },
  checkboxChecked: {
    backgroundColor: color.primary,
  },
  checkmark: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  rememberText: {
    fontSize: 14,
    fontFamily: "Regular",
    color: "#6B7280",
  },
  forgotText: {
    fontSize: 14,
    color: color.black,
    textDecorationLine: "underline",
  },
  termsContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 32,
  },
  termsTextContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  termsText: {
    fontSize: 14,
    color: color.black,
    lineHeight: 20,
    fontFamily: "Regular",
  },
  termsLink: {
    fontSize: 14,
    color: color.primary,
    lineHeight: 20,
  },
  primaryButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#5B7C99",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  alternateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  alternateText: {
    fontSize: 14,
    color: color.black,
    fontFamily: "Regular",
  },
  alternateLink: {
    fontSize: 14,
    color: color.primary,
    fontFamily: "SemiBold",
  },
  dividerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  divider: {
    width: "42%",
    height: 0.5,
    backgroundColor: color.gray,
  },
  orText: {
    fontSize: 14,
    color: color.black,
    fontFamily: "Medium",
  },
  socialContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  socialButton: {
    flex: 0.48,
    height: 56,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  appleIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4285F4",
    marginRight: 8,
    backgroundColor: "#FFF",
    width: 20,
    height: 20,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 10,
  },
  socialButtonText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
  },
});
