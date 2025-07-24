import CustomButton from "@/components/CustomButton";
import SocailLogin from "@/components/socailLogin";
import { color } from "@/constants/Colors";
import { svgIcon } from "@/constants/Images";
import { clearError, loginUser, registerUser } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Octicons from "@expo/vector-icons/Octicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function AuthScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const Logo = svgIcon.Logo;
  const { mode } = useLocalSearchParams();
  const [isSignup, setIsSignup] = useState(mode === "signup");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Clear error when component mounts or mode changes
  useEffect(() => {
    dispatch(clearError());
  }, [isSignup, dispatch]);

  // Navigate to home if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace("/home/home");
    }
  }, [isAuthenticated, user, router]);

  // Show error alert
  useEffect(() => {
    if (error) {
      Alert.alert("Authentication Error", getErrorMessage(error), [
        { text: "OK", onPress: () => dispatch(clearError()) },
      ]);
    }
  }, [error, dispatch]);

  const getErrorMessage = (error: string) => {
    if (error.includes("invalid-email")) {
      return "Please enter a valid email address.";
    } else if (error.includes("user-disabled")) {
      return "This account has been disabled.";
    } else if (error.includes("user-not-found")) {
      return "No account found with this email address.";
    } else if (error.includes("wrong-password")) {
      return "Incorrect password. Please try again.";
    } else if (error.includes("email-already-in-use")) {
      return "An account with this email already exists.";
    } else if (error.includes("weak-password")) {
      return "Password should be at least 6 characters long.";
    } else if (error.includes("too-many-requests")) {
      return "Too many failed attempts. Please try again later.";
    }
    return error;
  };

  const validateForm = () => {
    if (!email.trim()) {
      Alert.alert("Validation Error", "Please enter your email address.");
      return false;
    }

    if (!email.includes("@")) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return false;
    }

    if (!password.trim()) {
      Alert.alert("Validation Error", "Please enter your password.");
      return false;
    }

    if (password.length < 6) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters long."
      );
      return false;
    }

    if (isSignup) {
      if (!confirmPassword.trim()) {
        Alert.alert("Validation Error", "Please confirm your password.");
        return false;
      }

      if (password !== confirmPassword) {
        Alert.alert("Validation Error", "Passwords do not match.");
        return false;
      }

      if (!agreeToTerms) {
        Alert.alert(
          "Validation Error",
          "Please agree to the Terms of Service and Privacy Policy."
        );
        return false;
      }
    }

    return true;
  };

  const handlePrimaryAction = async () => {
    if (!validateForm()) return;

    try {
      if (isSignup) {
        await dispatch(
          registerUser({ email: email.trim(), password })
        ).unwrap();
        console.log("Account created successfully");
      } else {
        await dispatch(loginUser({ email: email.trim(), password })).unwrap();
        console.log("Login successful");
      }
    } catch (error) {
      // Error is handled by useEffect above
      console.log("Authentication error:", error);
    }
  };

  const handleForgotPassword = () => {
    router.push("/auth/forget");
    console.log("Forgot password pressed");
  };

  const handleAlternateAction = () => {
    setIsSignup(!isSignup);

    // Clear form
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRememberMe(false);
    setAgreeToTerms(false);
    setShowPassword(false);
    setShowConfirmPassword(false);

    // Clear any existing errors
    dispatch(clearError());

    if (isSignup) {
      console.log("Switch to Sign In");
    } else {
      console.log("Switch to Sign Up");
    }
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
          onChangeText={(text) => {
            setEmail(text);
            if (error) dispatch(clearError());
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A0A0A0"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (error) dispatch(clearError());
          }}
          secureTextEntry={!showPassword}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
          disabled={isLoading}
        >
          <Octicons
            name={showPassword ? "eye-closed" : "eye"}
            size={18}
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
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (error) dispatch(clearError());
            }}
            secureTextEntry={!showConfirmPassword}
            editable={!isLoading}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={isLoading}
          >
            <Octicons
              name={showConfirmPassword ? "eye-closed" : "eye"}
              size={18}
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
            disabled={isLoading}
          >
            <View
              style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
            >
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForgotPassword} disabled={isLoading}>
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
            disabled={isLoading}
          >
            <View
              style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}
            >
              {agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
          </TouchableOpacity>
          <View style={styles.termsTextContainer}>
            <Text style={styles.termsText}>{`I'm agree to `}</Text>
            <TouchableOpacity disabled={isLoading}>
              <Text style={styles.termsLink}>The Terms of Service</Text>
            </TouchableOpacity>
            <Text style={styles.termsText}> and </Text>
            <TouchableOpacity disabled={isLoading}>
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Primary Action Button */}
      <CustomButton
        title={
          isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="white" size="small" />
              <Text style={styles.loadingText}>
                {isSignup ? "Creating Account..." : "Signing In..."}
              </Text>
            </View>
          ) : isSignup ? (
            "Create Account"
          ) : (
            "Login"
          )
        }
        onPress={handlePrimaryAction}
        variant="primary"
        customStyle={[
          styles.loginButton,
          isLoading && styles.loginButtonDisabled,
        ]}
        customTextStyle={styles.loginButtonText}
        disabled={isLoading}
      />

      {/* Alternate Action Link */}
      <View style={styles.alternateContainer}>
        <Text style={styles.alternateText}>
          {isSignup ? "Do you have account? " : "Don't have account? "}
        </Text>
        <TouchableOpacity onPress={handleAlternateAction} disabled={isLoading}>
          <Text
            style={[styles.alternateLink, isLoading && styles.disabledText]}
          >
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
        <SocailLogin />
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
    fontSize: 24,
    fontFamily: "SemiBold",
    color: color.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Medium",
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
    fontFamily: "Regular",
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
    width: 24,
    height: 24,
    borderRadius: 4,
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
    color: color.primary,
    fontFamily: "Regular",
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
    fontFamily: "Regular",
  },
  loginButton: {
    alignItems: "center",
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    fontFamily: "Regular",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "white",
    marginLeft: 8,
    fontFamily: "Regular",
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
  disabledText: {
    opacity: 0.5,
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
});
