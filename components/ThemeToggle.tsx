// Core
import { Ionicons } from "@expo/vector-icons";
import { FC, PropsWithChildren, useRef } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";

// Utils
import { GLOBAL_STYLES } from "../constants/styles";

type TThemeToggle = {
  onChange: Function;
  value: boolean;
} & PropsWithChildren;

const lightAnimationConfig = {
  toValue: 1,
  duration: 500,
  useNativeDriver: true,
};

const darkAnimationConfig = {
  toValue: 0,
  duration: 500,
  useNativeDriver: true,
};

const ThemeToggle: FC<TThemeToggle> = ({ onChange, value }) => {
  const handlePress = () => {
    onChange(!value);
    if (value) {
      Animated.parallel([
        sunMoonMoveRight,
        lensMoveRight,
        sunFadeIn,
        mountainMoveRight,
        cloudMoveRight,
        starsFadeIn,
      ]).start();
    } else {
      Animated.parallel([
        sunMoonMoveLeft,
        lensMoveLeft,
        sunFadeOut,
        mountainMoveLeft,
        cloudMoveLeft,
        starsFadeOut,
      ]).start();
    }
  };

  const lensAnim = useRef(new Animated.Value(0)).current;
  const lensMoveRight = Animated.timing(lensAnim, lightAnimationConfig);
  const lensMoveLeft = Animated.timing(lensAnim, darkAnimationConfig);
  const lensXVal = lensAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  const sunMoonAnim = useRef(new Animated.Value(0)).current;
  const sunMoonMoveRight = Animated.timing(sunMoonAnim, lightAnimationConfig);
  const sunMoonMoveLeft = Animated.timing(sunMoonAnim, darkAnimationConfig);
  const sunMoonXVal = sunMoonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 90],
  });

  const sunFadeAnim = useRef(new Animated.Value(0)).current;
  const sunFadeIn = Animated.timing(sunFadeAnim, lightAnimationConfig);
  const sunFadeOut = Animated.timing(sunFadeAnim, darkAnimationConfig);

  const mountainAnim = useRef(new Animated.Value(0)).current;
  const mountainMoveRight = Animated.timing(mountainAnim, lightAnimationConfig);
  const mountainMoveLeft = Animated.timing(mountainAnim, darkAnimationConfig);
  const mountainXVal = mountainAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 30],
  });

  const cloudAnim = useRef(new Animated.Value(0)).current;
  const cloudMoveRight = Animated.timing(cloudAnim, lightAnimationConfig);
  const cloudMoveLeft = Animated.timing(cloudAnim, darkAnimationConfig);
  const cloudXVal = cloudAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 40],
  });

  const starsFadeAnim = useRef(new Animated.Value(0)).current;
  const starsFadeIn = Animated.timing(starsFadeAnim, darkAnimationConfig);
  const starsFadeOut = Animated.timing(starsFadeAnim, lightAnimationConfig);

  const { moon, stars, cloud, lightMountain, darkMountain, lens } =
    GLOBAL_STYLES.colors.common.themeToggle;
  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <Animated.View style={[{ opacity: sunFadeAnim }]}>
          <View style={styles.lightSky} />
        </Animated.View>
        <Animated.View
          style={{
            transform: [{ translateX: sunMoonXVal }, { translateY: 10 }],
          }}
        >
          <View style={styles.moon}>
            <Ionicons name="moon" size={30} color={moon} />
          </View>
          <Animated.View style={[{ opacity: sunFadeAnim }]}>
            <View
              style={[
                styles.sun,
                { transform: [{ translateY: 0 }, { translateX: 40 }] },
              ]}
            />
          </Animated.View>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateX: mountainXVal }] }}>
          <View style={styles.backMountain}>
            <Ionicons name="triangle" size={90} color={darkMountain} />
          </View>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateX: mountainXVal }] }}>
          <View style={styles.frontMountain}>
            <Ionicons name="triangle" size={90} color={lightMountain} />
          </View>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateX: cloudXVal }] }}>
          <View style={styles.cloud}>
            <Ionicons name="cloud" size={30} color={cloud} />
          </View>
        </Animated.View>
        <Animated.View style={[{ opacity: starsFadeAnim }]}>
          <View style={styles.stars}>
            <Ionicons name="sparkles" size={15} color={stars} />
          </View>
        </Animated.View>
        <Animated.View style={{ transform: [{ translateX: lensXVal }] }}>
          <View style={styles.lens}>
            <Ionicons name="invert-mode" size={95} color={lens} />
          </View>
        </Animated.View>
      </View>
    </Pressable>
  );
};

export default ThemeToggle;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GLOBAL_STYLES.colors.common.themeToggle.darkSky,
    borderColor: GLOBAL_STYLES.colors.common.themeToggle.border,
    borderRadius: 50,
    borderStyle: "solid",
    borderWidth: 2,
    flexDirection: "row",
    height: 100,
    overflow: "hidden",
    padding: 0,
    width: 200,
  },
  lightSky: {
    position: "absolute",
    width: 200,
    height: 100,
    backgroundColor: GLOBAL_STYLES.colors.common.themeToggle.lightSky,
  },
  sun: {
    backgroundColor: GLOBAL_STYLES.colors.common.themeToggle.sun,
    borderRadius: 30,
    height: 30,
    position: "absolute",
    width: 30,
  },
  moon: {
    transform: [{ translateX: 40 }],
    position: "absolute",
  },
  backMountain: {
    transform: [{ translateX: 60 }, { translateY: 30 }],
    position: "absolute",
  },
  frontMountain: {
    transform: [{ translateX: 30 }, { translateY: 40 }],
    position: "absolute",
  },
  cloud: {
    opacity: 0.67,
    transform: [{ translateX: 70 }, { translateY: 60 }],
    position: "absolute",
  },
  stars: {
    transform: [{ translateX: 140 }, { translateY: 25 }],
    position: "absolute",
  },
  lens: {
    opacity: 0.25,
    transform: [{ translateX: 0 }],
    position: "absolute",
  },
});
