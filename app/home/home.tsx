import CustomButton from "@/components/CustomButton";
import { color } from "@/constants/Colors";
import { image, svgIcon } from "@/constants/Images";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: screenWidth } = Dimensions.get("window");

export default function Home() {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragTrigger, setDragTrigger] = useState<number | null>(null);
  const draggingRef = useRef<number | null>(null);
  const Menu = svgIcon.Menu;
  const gridRef = useRef<View>(null);

  useEffect(() => {
    if (dragTrigger !== null) {
      setDraggedIndex(dragTrigger);
    }
  }, [dragTrigger]);

  const participants = [
    {
      id: 1,
      avatar:
        "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
    },
    {
      id: 2,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 3,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
  ];
  const totalParticipants = 12;
  const remainingCount = totalParticipants - participants.length;

  const initialCelebrities = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      name: "Celebrity 1",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      name: "Celebrity 2",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
      name: "Celebrity 3",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face",
      name: "Celebrity 4",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
      name: "Celebrity 5",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      name: "Celebrity 6",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      name: "Celebrity 7",
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
      name: "Celebrity 8",
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face",
      name: "Celebrity 9",
    },
  ];

  const [celebrities, setCelebrities] = useState(initialCelebrities);

  // Calculate grid dimensions
  const gridWidth = screenWidth * 0.8;
  const itemWidth = gridWidth / 3;

  const swapCelebrities = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;

    setCelebrities((prevCelebrities) => {
      const newCelebrities = [...prevCelebrities];
      [newCelebrities[fromIndex], newCelebrities[toIndex]] = [
        newCelebrities[toIndex],
        newCelebrities[fromIndex],
      ];
      return newCelebrities;
    });
  };

  const getPositionFromCoordinates = (
    absoluteX: number,
    absoluteY: number,
    callback: (dropIndex: number) => void
  ) => {
    if (!gridRef.current) {
      callback(-1);
      return;
    }

    gridRef.current.measure((x, y, width, height, pageX, pageY) => {
      // Calculate relative coordinates within the grid
      const relativeX = absoluteX - pageX - 8; // Subtract grid padding
      const relativeY = absoluteY - pageY - 8; // Subtract grid padding

      // Check if the drop point is within grid boundaries
      if (
        relativeX < 0 ||
        relativeY < 0 ||
        relativeX > width - 16 || // Account for padding
        relativeY > height - 16
      ) {
        callback(-1); // Invalid drop position
        return;
      }

      const col = Math.floor(relativeX / itemWidth);
      const row = Math.floor(relativeY / itemWidth);

      const clampedCol = Math.max(0, Math.min(2, col));
      const clampedRow = Math.max(0, Math.min(2, row));

      const newIndex = clampedRow * 3 + clampedCol;
      const validIndex = Math.max(0, Math.min(8, newIndex));

      callback(validIndex);
    });
  };

  const handleSubmit = () => {
    router.push("/home/testResults");
    console.log(
      "Final Ranking:",
      celebrities.map((c, i) => ({
        position: i + 1,
        celebrity: c.name,
      }))
    );
  };

  const handleProfile = () => {
    router.push("/profile/profile");
  };

  const DraggableImage = ({
    celebrity,
    index,
  }: {
    celebrity: any;
    index: number;
  }) => {
    const pan = useRef(new Animated.ValueXY()).current;
    const scale = useRef(new Animated.Value(1)).current;

    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        draggingRef.current = index;
        setDragTrigger(index);
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
        Animated.spring(scale, {
          toValue: 1.1,
          useNativeDriver: false,
        }).start();
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (evt) => {
        pan.flattenOffset();

        // Get drop position using improved coordinate calculation
        getPositionFromCoordinates(
          evt.nativeEvent.pageX,
          evt.nativeEvent.pageY,
          (dropIndex) => {
            // Only swap if it's a valid drop position and different from current
            if (dropIndex !== -1 && dropIndex !== index) {
              swapCelebrities(index, dropIndex);
            }

            // Reset animations
            Animated.parallel([
              Animated.spring(pan, {
                toValue: { x: 0, y: 0 },
                useNativeDriver: false,
              }),
              Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: false,
              }),
            ]).start();
          }
        );
      },
    });

    return (
      <Animated.View
        style={[
          styles.imageContainer,
          {
            transform: [
              { translateX: pan.x },
              { translateY: pan.y },
              { scale: scale },
            ],
            zIndex: draggedIndex === index ? 1000 : 1,
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.celebrityImageWrapper}>
          <Image
            source={{ uri: celebrity.image }}
            style={styles.celebrityImage}
          />
          <View style={styles.numberBox}>
            <Text style={styles.numberText}>{index + 1}</Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderCelebrityGrid = () => {
    return celebrities.map((celebrity, index) => (
      <DraggableImage
        key={`${celebrity.id}-${index}`}
        celebrity={celebrity}
        index={index}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.toggleIcon}>
          <Menu />
        </View>

        <View style={styles.headerCenter}>
          <Text style={styles.greeting}>Hello! John</Text>
          <Text style={styles.date}>Today 11 July</Text>
        </View>

        <TouchableOpacity onPress={handleProfile}>
          <Image
            source={{
              uri: "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Daily Challenge Card */}
        <View style={styles.challengeCard}>
          <View style={styles.challengeContent}>
            <View style={styles.challengeLeft}>
              <Text style={styles.challengeTitle}>Daily{"\n"}Challenge</Text>

              <View style={styles.participantsRow}>
                {participants.map((participant, index) => (
                  <View
                    key={participant.id}
                    style={[
                      styles.participantContainer,
                      { marginLeft: index > 0 ? -8 : 0 },
                    ]}
                  >
                    <Image
                      source={{ uri: participant.avatar }}
                      style={styles.participantImage}
                    />
                  </View>
                ))}
                {remainingCount > 0 && (
                  <View
                    style={[
                      styles.moreParticipants,
                      { marginLeft: participants.length > 0 ? -8 : 0 },
                    ]}
                  >
                    <Text style={styles.moreText}>+{remainingCount}</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.challengeIllustration}>
              <Image source={image.billboard} style={styles.billboard} />
            </View>
          </View>
        </View>

        {/* Instructions */}
        <Text style={styles.instructions}>
          You can drag these pictures for ranking.
        </Text>

        {/* Topic Title */}
        <Text
          style={styles.topicTitle}
        >{`Today's topic: Male celebrities`}</Text>

        {/* Celebrity Grid - Added ref for position measurement */}
        <View ref={gridRef} style={styles.imageGrid}>
          {renderCelebrityGrid()}
        </View>

        {/* Submit Button */}
        <CustomButton
          title="Submit"
          onPress={handleSubmit}
          customStyle={styles.submitButton}
          customTextStyle={styles.submitButtonText}
        />
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
  toggleIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.gray,
    borderRadius: 99,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 99,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  challengeCard: {
    backgroundColor: "#E3F2FD",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  challengeContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  challengeLeft: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 32,
    fontFamily: "Medium",
    color: color.black,
    marginBottom: 24,
    lineHeight: 38,
  },
  participantsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  participantContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "white",
  },
  participantImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  moreParticipants: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#93C5FD",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  moreText: {
    color: "#2563EB",
    fontSize: 14,
    fontFamily: "SemiBold",
  },
  challengeIllustration: {
    width: 120,
    height: 160,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  billboard: {
    position: "absolute",
    bottom: -40,
  },
  instructions: {
    fontSize: 16,
    fontFamily: "Medium",
    color: color.black,
    textAlign: "center",
    marginBottom: 12,
  },
  topicTitle: {
    fontSize: 24,
    fontFamily: "SemiBold",
    color: color.black,
    textAlign: "center",
    marginBottom: 20,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
    padding: 8,
    marginBottom: 40,
    width: "80%",
    alignSelf: "center",
  },
  imageContainer: {
    width: "33.33%",
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: color.primary,
    marginRight: -3,
    marginBottom: -3,
  },
  celebrityImageWrapper: {
    flex: 1,
    position: "relative",
  },
  celebrityImage: {
    width: "100%",
    height: "100%",
  },
  numberBox: {
    position: "absolute",
    top: 6,
    left: 6,
    width: 20,
    height: 20,
    backgroundColor: color.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: color.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontSize: 12,
    fontFamily: "SemiBold",
    color: color.black,
  },
  submitButton: {
    alignItems: "center",
  },
  submitButtonText: {
    fontFamily: "Medium",
  },
});
