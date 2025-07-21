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
    // Handle Google login
    console.log("Google login pressed");
  };

  const handleSignUp = () => {
    router.push({ pathname: "/auth/login", params: { mode: "signup" } });
    // console.log("Sign up pressed");
  };

  return (
    <View style={styles.container}>
      {/* Top Image Area */}
      <View style={styles.imageContainer}>
        <Image source={image.onboarding} style={styles.onboardingImage} />
      </View>

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
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: width,
    height: height * 0.55,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  onboardingImage: {
    width: "80%",
    height: "65%",
    resizeMode: "cover",
  },
  title: {
    fontSize: 28,
    fontFamily: "Bold",
    color: color.black,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 35,
  },
  buttonContainer: {
    width: "80%",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  signUpText: {
    color: color.black,
    fontSize: 16,
  },
  signUpLink: {
    color: color.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});
