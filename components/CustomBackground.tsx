import React, { useMemo } from "react";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import Animated, {
  useAnimatedStyle,
  interpolateColor,
  clamp,
} from "react-native-reanimated";

const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
  style,
  animatedIndex,
}) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      clamp(animatedIndex.value, 0, 1),
      [0, 1],
      ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.0)"] // this sets the color of the bg when at snapped positions
    ),
  }));

  const containerStyle = useMemo(() => [style, containerAnimatedStyle], [
    style,
    containerAnimatedStyle,
  ]);

  return <Animated.View pointerEvents="none" style={containerStyle} />;
};

export default CustomBackground;
