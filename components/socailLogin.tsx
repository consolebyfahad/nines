import { color } from "@/constants/Colors";
import { svgIcon } from "@/constants/Images";
import * as AppleAuthentication from "expo-apple-authentication";
import { router } from "expo-router";
import React from "react";
import { Alert, Platform, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";

export default function SocialLogin() {
  const Apple = svgIcon.Apple;
  const Google = svgIcon.Google;

  const handleAppleLogin = async () => {
    try {
      if (Platform.OS !== "ios") {
        Alert.alert(
          "Not Available",
          "Apple Sign-In is only available on iOS devices"
        );
        return;
      }

      const isAvailable = await AppleAuthentication.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert(
          "Not Available",
          "Apple Sign-In is not available on this device"
        );
        return;
      }

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      console.log("Apple Authentication Success:", {
        user: credential.user,
        email: credential.email,
        fullName: credential.fullName,
        identityToken: credential.identityToken,
        authorizationCode: credential.authorizationCode,
      });

      Alert.alert(
        "Login Successful",
        `Welcome ${credential.fullName?.givenName || "User"}!`,
        [
          {
            text: "Continue",
            onPress: () => router.replace("/home/home"),
          },
        ]
      );
    } catch (error) {
      if (error === "ERR_REQUEST_CANCELED") {
        console.log("Apple Sign-In was canceled by user");
      } else {
        console.error("Apple Authentication Error:", error);
        Alert.alert(
          "Authentication Failed",
          "Unable to sign in with Apple. Please try again."
        );
      }
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login pressed");
    Alert.alert(
      "Coming Soon",
      "Google authentication will be implemented soon"
    );
  };

  return (
    <>
      {Platform.OS === "ios" && (
        <CustomButton
          title={"Apple"}
          variant="secondary"
          icon={Apple}
          customStyle={styles.socialIcon}
          customTextStyle={styles.socialButtonText}
          onPress={handleAppleLogin}
        />
      )}

      <CustomButton
        title={"Google"}
        variant="secondary"
        icon={Google}
        customStyle={[
          styles.socialIcon,
          Platform.OS !== "ios" && styles.fullWidth,
        ]}
        customTextStyle={styles.socialButtonText}
        onPress={handleGoogleLogin}
      />
    </>
  );
}

const styles = StyleSheet.create({
  socialIcon: {
    alignItems: "center",
    width: "49%",
    backgroundColor: color.secondary100,
  },
  socialButtonText: {
    fontFamily: "Medium",
    color: color.gray100,
  },
  fullWidth: {
    width: "100%",
  },
});
