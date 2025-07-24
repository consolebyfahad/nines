import { color } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CustomButtonProps = {
  title: any;
  onPress: () => void;
  customStyle?: object;
  customTextStyle?: object;
  iconbg?: boolean;
  variant?: "primary" | "secondary";
  icon?: React.ComponentType<{ width: number; height: number }>;
  disabled?: boolean;
};

export default function CustomButton({
  title,
  onPress,
  customStyle,
  customTextStyle,
  iconbg = false,
  variant = "primary",
  icon: IconComponent,
  disabled = false,
}: CustomButtonProps) {
  const buttonStyle =
    variant === "primary" ? styles.primaryButton : styles.secondaryButton;
  const textStyle =
    variant === "primary"
      ? styles.primaryButtonText
      : styles.secondaryButtonText;

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
        <Text style={[textStyle, customTextStyle]}>{title}</Text>
        <View></View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    width: "100%",
    height: 55,
    backgroundColor: color.primary,
    borderRadius: 12,
    padding: 8,
    // alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  secondaryButton: {
    width: "100%",
    height: 55,
    backgroundColor: color.secondary,
    borderRadius: 12,
    // alignItems: "center",
    padding: 8,
    justifyContent: "center",
    marginBottom: 30,
  },
  primaryButtonText: {
    color: color.white,
    fontSize: 18,
    fontFamily: "Bold",
    textAlign: "center",
  },
  secondaryButtonText: {
    color: color.primary,
    fontSize: 18,
    fontFamily: "Bold",
    textAlign: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
