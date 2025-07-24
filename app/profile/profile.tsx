import CustomButton from "@/components/CustomButton";
import { color } from "@/constants/Colors";
import { logoutUser } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

export default function Profile() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [profileImage, setProfileImage] = useState(
    "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg"
  );
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    Alert.alert("Success", "Profile updated successfully!");
    console.log("Profile saved:", { name, email });
  };

  const handleChangePhoto = async () => {
    // Request permission to access media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "Permission to access camera roll is required!"
      );
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      console.log("Image selected:", result.assets[0].uri);
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      console.log("Logged out successfully");
      router.push("/auth/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  // const handleLogout = () => {
  //   Alert.alert("Logout", "Are you sure you want to logout?", [
  //     { text: "Cancel", style: "cancel" },
  //     {
  //       text: "Logout",
  //       style: "destructive",
  //       onPress: () => {
  //         router.replace("/auth/login");
  //         console.log("User logged out");
  //       },
  //     },
  //   ]);
  // };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color={color.black} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Profile</Text>

        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Ionicons
            name={isEditing ? "close" : "create-outline"}
            size={24}
            color={color.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Profile Image Section */}
        <View style={styles.profileImageSection}>
          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={handleChangePhoto}
            activeOpacity={0.8}
          >
            <Image source={{ uri: profileImage }} style={styles.profileImage} />

            <View style={styles.galleryButton}>
              <Ionicons name="images" size={20} color={color.white} />
            </View>
          </TouchableOpacity>

          <Text style={styles.changePhotoText}>Tap to change photo</Text>
        </View>

        {/* Profile Information */}
        <View style={styles.infoSection}>
          {/* Name Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor={color.gray100}
              />
            ) : (
              <View style={styles.fieldValue}>
                <Text style={styles.valueText}>{name}</Text>
              </View>
            )}
          </View>

          {/* Email Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={color.gray100}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            ) : (
              <View style={styles.fieldValue}>
                <Text style={styles.valueText}>{email}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Profile Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Challenges</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Wins</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>67%</Text>
            <Text style={styles.statLabel}>Win Rate</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons
              name="help-circle-outline"
              size={20}
              color={color.primary}
            />
            <Text style={styles.actionButtonText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={16} color={color.gray100} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={color.primary}
            />
            <Text style={styles.actionButtonText}>About</Text>
            <Ionicons name="chevron-forward" size={16} color={color.gray100} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        {isEditing ? (
          <CustomButton
            title="Save Changes"
            onPress={handleSaveProfile}
            variant="primary"
            customStyle={styles.saveButton}
          />
        ) : (
          <CustomButton
            title="Logout"
            onPress={handleLogout}
            variant="secondary"
            customStyle={styles.logoutButton}
            customTextStyle={styles.logoutButtonText}
          />
        )}
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
  editButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileImageSection: {
    alignItems: "center",
    paddingVertical: 30,
  },
  profileImageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: color.secondary100,
  },
  galleryButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: color.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: color.white,
  },
  changePhotoText: {
    fontSize: 14,
    fontFamily: "Regular",
    color: color.gray100,
    marginTop: 8,
  },
  infoSection: {
    marginBottom: 10,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: "Medium",
    color: color.gray100,
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: color.secondary100,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Regular",
    color: color.black,
  },
  fieldValue: {
    height: 50,
    backgroundColor: color.secondary100,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  valueText: {
    fontSize: 16,
    fontFamily: "Regular",
    color: color.black,
  },
  saveButton: {
    alignItems: "center",
  },
  statsSection: {
    flexDirection: "row",
    backgroundColor: color.secondary100,
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: "Bold",
    color: color.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Regular",
    color: color.gray100,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: color.gray100,
    opacity: 0.3,
  },
  actionButtons: {
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: color.secondary100,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionButtonText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Regular",
    color: color.black,
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FCA5A5",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#DC2626",
    fontFamily: "Medium",
  },
});
