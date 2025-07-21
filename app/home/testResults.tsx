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

export default function TestResults() {
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
      { rank: "1", percentage: 23 },
      { rank: "1-2", percentage: 19 },
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

        {/* Results Chart */}
        <View style={styles.chartContainer}>
          {/* Column Headers */}
          <View style={styles.columnHeaders}>
            <View style={styles.rankColumn}>
              <Text style={styles.columnHeaderText}></Text>
            </View>
            <View style={styles.dataColumn}>
              <Text style={styles.columnHeaderText}>Friends</Text>
            </View>
            <View style={styles.dataColumn}>
              <Text style={styles.columnHeaderText}>All</Text>
            </View>
          </View>

          {/* Progress Bars */}
          {resultsData.friends.map((friendData, index) => {
            const allData = resultsData.all[index];
            const isLast = index === resultsData.friends.length - 1;

            return (
              <View key={friendData.rank} style={styles.chartRow}>
                <View style={styles.rankColumn}>
                  <Text style={styles.rankText}>{friendData.rank}</Text>
                </View>

                <View style={styles.dataColumn}>
                  <TouchableOpacity
                    style={styles.barContainer}
                    onPress={() => handleBarPress(friendData.rank, "friends")}
                  >
                    <View style={styles.progressBarBackground}>
                      <View
                        style={[
                          styles.progressBarFill,
                          { width: `${friendData.percentage}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.percentageText}>
                      {friendData.percentage}%
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.dataColumn}>
                  <TouchableOpacity
                    style={styles.barContainer}
                    onPress={() => handleBarPress(allData.rank, "all")}
                  >
                    <View style={styles.progressBarBackground}>
                      <View
                        style={[
                          styles.progressBarFill,
                          { width: `${allData.percentage}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.percentageText}>
                      {allData.percentage}%
                    </Text>
                  </TouchableOpacity>
                </View>

                {isLast && (
                  <View style={styles.ninersContainer}>
                    <Text style={styles.ninersText}>Niners!</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Share Section */}
        <View style={styles.shareSection}>
          <Text style={styles.shareTitle}>{`Share Today's Results`}</Text>
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
  chartContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginBottom: 40,
  },
  columnHeaders: {
    flexDirection: "row",
    marginBottom: 15,
  },
  columnHeaderText: {
    fontSize: 16,
    fontFamily: "SemiBold",
    color: color.black,
    textAlign: "center",
  },
  chartRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    position: "relative",
  },
  rankColumn: {
    width: 40,
    alignItems: "flex-start",
  },
  dataColumn: {
    flex: 1,
    marginHorizontal: 10,
  },
  rankText: {
    fontSize: 16,
    fontFamily: "SemiBold",
    color: color.black,
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressBarBackground: {
    flex: 1,
    height: 24,
    borderRadius: 2,
    overflow: "hidden",
    marginRight: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: color.success,
    borderRadius: 2,
  },
  percentageText: {
    fontSize: 14,
    fontFamily: "SemiBold",
    color: color.black,
    minWidth: 35,
    textAlign: "right",
  },
  ninersContainer: {
    position: "absolute",
    right: 10,
    bottom: -20,
  },
  ninersText: {
    fontSize: 12,
    fontFamily: "Medium",
    color: color.black,
  },
  shareSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  shareTitle: {
    fontSize: 18,
    fontFamily: "Bold",
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
