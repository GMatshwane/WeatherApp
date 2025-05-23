import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

interface AnimatedPulseProps {
  /**
   * The delay before the animation starts.
   * @default 0
   */
  delay?: number;
}
/**
 * Animated pulse effect component.
 * @param delay - The delay before the animation starts.
 * @returns The animated pulse effect component.
 */
const AnimatedPulse: React.FC<AnimatedPulseProps> = ({ delay }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    /**
     * The pulse animation.
     */
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 2.5,
            duration: 800,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 800,
            delay,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [scale, opacity, delay]);

  return (
    <Animated.View
      testID="animated-pulse"
      style={[
        styles.pulseCircle,
        {
          transform: [{ scale }],
          opacity,
        },
      ]}
    />
  );
};

export default AnimatedPulse;

/**
 * The styles for the animated pulse component.
 */
const styles = StyleSheet.create({
  /**
   * The pulse circle.
   */
  pulseCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    marginHorizontal: 10,
  },
});
