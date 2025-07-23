import CustomButton from "@/components/CustomButton";
import { color } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleGoHome = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color={color.black} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Page Not Found</Text>

        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Error Icon */}
        <View style={styles.iconSection}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="help-circle-outline"
              size={80}
              color={color.primary}
            />
          </View>
        </View>

        {/* Error Message */}
        <View style={styles.messageSection}>
          <Text style={styles.errorTitle}>Oops! Page Not Found</Text>
          <Text style={styles.errorDescription}>
            {` The page you're looking for doesn't exist. It might have been moved,
            deleted, or you entered the wrong URL.`}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <CustomButton
            title="Go to Home"
            onPress={handleGoHome}
            variant="primary"
            customStyle={styles.homeButton}
          />

          <TouchableOpacity
            style={styles.backActionButton}
            onPress={handleBackPress}
          >
            <Ionicons name="arrow-back" size={16} color={color.primary} />
            <Text style={styles.backActionText}>Go Back</Text>
          </TouchableOpacity>
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.helpText}>Need help?</Text>
          <TouchableOpacity style={styles.helpButton}>
            <Ionicons name="mail-outline" size={16} color={color.primary} />
            <Text style={styles.helpButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: color.secondary100,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "SemiBold",
    color: color.black,
    flex: 1,
    textAlign: "center",
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  iconSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: color.secondary100,
    justifyContent: "center",
    alignItems: "center",
  },
  messageSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  errorTitle: {
    fontSize: 24,
    fontFamily: "Bold",
    color: color.black,
    marginBottom: 12,
    textAlign: "center",
  },
  errorDescription: {
    fontSize: 16,
    fontFamily: "Regular",
    color: color.gray100,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  actionButtons: {
    marginBottom: 30,
  },
  homeButton: {
    alignItems: "center",
    marginBottom: 16,
  },
  backActionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: color.secondary100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: color.primary,
  },
  backActionText: {
    fontSize: 16,
    fontFamily: "Medium",
    color: color.primary,
    marginLeft: 8,
  },
  helpSection: {
    alignItems: "center",
  },
  helpText: {
    fontSize: 14,
    fontFamily: "Regular",
    color: color.gray100,
    marginBottom: 12,
  },
  helpButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  helpButtonText: {
    fontSize: 14,
    fontFamily: "Regular",
    color: color.primary,
    marginLeft: 6,
  },
});
