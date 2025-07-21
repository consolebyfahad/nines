import CustomButton from "@/components/CustomButton";
import { color } from "@/constants/Colors";
import { image, svgIcon } from "@/constants/Images";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Onboarding() {
  const Google = svgIcon.Google;
  const Phone = svgIcon.Phone;
  const handlePhoneLogin = () => {
    router.push("/auth/login");
    console.log("Phone login pressed");
  };

  const handleGoogleLogin = () => {
    console.log("Google login pressed");
  };

  const handleSignUp = () => {
    router.push({ pathname: "/auth/login", params: { mode: "signup" } });
  };

  return (
    <View style={styles.container}>
      {/* Top Image Area */}
      <Image source={image.onboarding} style={styles.onboardingImage} />

      {/* Title */}
      <Text style={styles.title}>
        {` Let's meeting new\npeople around you`}
      </Text>

      <View style={styles.buttonContainer}>
        {/* Login Buttons */}
        <CustomButton
          title="Login with Phone"
          variant="primary"
          icon={Phone}
          iconbg={true}
          onPress={handlePhoneLogin}
        />

        <CustomButton
          title="Login with Google"
          variant="secondary"
          icon={Google}
          iconbg={true}
          onPress={handleGoogleLogin}
        />
      </View>
      {/* Sign Up Text */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>{`Don't have an account? `}</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  onboardingImage: {
    width: width * 0.78,
    height: height * 0.35,
    resizeMode: "cover",
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontFamily: "Bold",
    color: color.black,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 35,
  },
  buttonContainer: {
    width: "76%",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  signUpText: {
    color: color.black,
    fontFamily: "Regular",
    fontSize: 14,
  },
  signUpLink: {
    color: color.primary,
    fontSize: 14,
    fontFamily: "SemiBold",
  },
});
