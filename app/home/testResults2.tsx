import { color } from "@/constants/Colors";
import { svgIcon } from "@/constants/Images";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TestResults2() {
  const Youtube = svgIcon.Youtube;
  const Facebook = svgIcon.Facebook;
  const Tiktok = svgIcon.Tiktok;
  const Instagram = svgIcon.Instagram;

  // Mock data - replace with actual backend data
  const resultsData = {
    friends: [
      { rank: "1", percentage: 37 },
      { rank: "1-2", percentage: 31 },
      { rank: "1-3", percentage: 25 },
      { rank: "1-4", percentage: 15 },
      { rank: "1-5", percentage: 10 },
      { rank: "1-6", percentage: 8 },
      { rank: "1-7", percentage: 5 },
      { rank: "1-8", percentage: 3 },
      { rank: "1-9", percentage: 1 },
    ],
    all: [
      { rank: "1", percentage: 37 },
      { rank: "1-2", percentage: 31 },
      { rank: "1-3", percentage: 18 },
      { rank: "1-4", percentage: 16 },
      { rank: "1-5", percentage: 14 },
      { rank: "1-6", percentage: 12 },
      { rank: "1-7", percentage: 8 },
      { rank: "1-8", percentage: 6 },
      { rank: "1-9", percentage: 2 },
    ],
  };

  const handleBack = () => {
    router.back();
  };

  const handleBarPress = (rank: any, type: any) => {
    console.log(`Bar pressed: ${rank} in ${type}`);
  };

  const handleShare = (platform: any) => {
    console.log(`Share on ${platform}`);
  };

  const renderChart = (data: any, title: string, type: string) => (
    <View style={styles.separateChartContainer}>
      <View style={styles.chartHeader}>
        <Text style={styles.chartTitle}>Statistics</Text>
        <Text style={styles.chartSubtitle}>
          Based on {title === "Friends" ? "friends" : "all people"}
        </Text>
      </View>

      <View style={styles.chartContent}>
        {/* Vertical Grid Background */}
        <View style={styles.verticalGridBackground}>
          {Array.from({ length: 10 }, (_, i) => (
            <View
              key={i}
              style={[styles.verticalGridLine, { left: `${(i + 1) * 10}%` }]}
            />
          ))}
        </View>

        {/* Progress Bars */}
        <View style={styles.barsContainer}>
          {data.map((item: any, index: number) => {
            const isLast = index === data.length - 1;
            return (
              <View key={item.rank} style={styles.barRow}>
                <Text style={styles.rankLabel}>{item.rank}</Text>
                <TouchableOpacity
                  style={styles.enhancedBarContainer}
                  onPress={() => handleBarPress(item.rank, type)}
                >
                  <View style={styles.enhancedProgressBackground}>
                    <View
                      style={[
                        styles.enhancedProgressFill,
                        { width: `${item.percentage}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.enhancedPercentageText}>
                    {item.percentage}%
                  </Text>
                </TouchableOpacity>
                {isLast && (
                  <Text style={styles.enhancedNinersText}>Niners!</Text>
                )}
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.chartFooter}>
        <Text style={styles.chartFooterTitle}>{title}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={18} color={color.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Test Results</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Description */}
        <Text style={styles.description}>
          <Text style={styles.boldText}>Armchair psychoanalysis.</Text> You are
          someone who once tried micro dosing during a ken burns documentary...
        </Text>

        {/* Statistics Header */}
        <View style={styles.statisticsHeader}>
          <Text style={styles.statisticsTitle}>Statistics </Text>
          <Text style={styles.statisticsSubtitle}>
            ( Click on bars to see people )
          </Text>
        </View>

        {/* Enhanced Charts */}
        {renderChart(resultsData.friends, "Friends", "friends")}
        {renderChart(resultsData.all, "All", "all")}

        {/* Share Section */}
        <View style={styles.shareSection}>
          <Text style={styles.shareTitle}>Share</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleShare("instagram")}
            >
              <Instagram />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleShare("tiktok")}
            >
              <Tiktok />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleShare("facebook")}
            >
              <Facebook />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleShare("youtube")}
            >
              <Youtube />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 4,
    borderRadius: 99,
    backgroundColor: color.primary,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "SemiBold",
    color: color.black,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: color.black,
    lineHeight: 22,
    marginBottom: 30,
    fontFamily: "Regular",
  },
  boldText: {
    fontFamily: "SemiBold",
  },
  statisticsHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  statisticsTitle: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "SemiBold",
    color: color.black,
    marginBottom: 5,
  },
  statisticsSubtitle: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Regular",
    color: color.black,
  },
  separateChartContainer: {
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  chartHeader: {
    marginBottom: 15,
  },
  chartTitle: {
    fontSize: 16,
    fontFamily: "SemiBold",
    color: color.black,
    textAlign: "left",
  },
  chartSubtitle: {
    fontSize: 12,
    fontFamily: "Regular",
    color: "#666",
    textAlign: "left",
    marginTop: 2,
  },
  chartContent: {
    position: "relative",
    paddingVertical: 10,
  },
  verticalGridBackground: {
    position: "absolute",
    top: 0,
    left: 45,
    right: 40,
    bottom: 0,
  },
  verticalGridLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 0.5,
    backgroundColor: color.primary,
    opacity: 0.4,
  },
  barsContainer: {
    paddingVertical: 5,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    position: "relative",
  },
  rankLabel: {
    fontSize: 16,
    fontFamily: "SemiBold",
    color: color.black,
    width: 35,
    textAlign: "left",
  },
  enhancedBarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  enhancedProgressBackground: {
    flex: 1,
    height: 22,
    borderRadius: 3,
    overflow: "hidden",
    marginRight: 8,
  },
  enhancedProgressFill: {
    height: "100%",
    backgroundColor: color.success,
    borderRadius: 2,
    shadowColor: color.success,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  enhancedPercentageText: {
    fontSize: 14,
    fontFamily: "SemiBold",
    color: color.black,
    minWidth: 35,
    textAlign: "right",
  },
  enhancedNinersText: {
    position: "absolute",
    right: 0,
    bottom: -18,
    fontSize: 11,
    fontFamily: "SemiBold",
    color: color.black,
    fontStyle: "italic",
  },
  chartFooter: {
    paddingTop: 15,
    paddingLeft: 5,
  },
  chartFooterTitle: {
    fontSize: 16,
    fontFamily: "SemiBold",
    color: color.black,
    textAlign: "left",
  },
  shareSection: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
  },
  shareTitle: {
    fontSize: 18,
    fontFamily: "SemiBold",
    color: color.black,
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
