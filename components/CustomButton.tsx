import { color } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  customStyle?: object;
  iconbg?: boolean;
  variant?: "primary" | "secondary";
  icon?: React.ComponentType<{ width: number; height: number }>;
  disabled?: boolean;
};

export default function CustomButton({
  title,
  onPress,
  customStyle,
  iconbg = false,
  variant = "primary",
  icon: IconComponent,
  disabled = false,
}: CustomButtonProps) {
  const buttonStyle =
    variant === "primary" ? styles.phoneButton : styles.googleButton;
  const textStyle =
    variant === "primary" ? styles.phoneButtonText : styles.googleButtonText;

  return (
    <TouchableOpacity
      style={[buttonStyle, customStyle, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[styles.buttonContent]}>
        {IconComponent && (
          <View style={[styles.iconContainer, iconbg && styles.iconBg]}>
            <IconComponent width={20} height={20} />
          </View>
        )}
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  phoneButton: {
    width: "100%",
    height: 55,
    backgroundColor: color.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  googleButton: {
    width: "100%",
    height: 55,
    backgroundColor: color.secondary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  phoneButtonText: {
    color: color.white,
    fontSize: 18,
    fontFamily: "Bold",
  },
  googleButtonText: {
    color: color.primary,
    fontSize: 18,
    fontFamily: "Bold",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    padding: 8,
    marginRight: 10,
  },
  iconBg: {
    backgroundColor: color.white,
    borderRadius: 99,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
