import { useEffect, useMemo } from 'react';
import { Canvas, Circle, Path, Skia } from '@shopify/react-native-skia';
import { memo } from 'react';
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import type { CircleIndicatorProps } from '../types';
import {
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_CIRCLE_SIZE,
  DEFAULT_COLOR,
  DEFAULT_DURATION,
} from '../constants';

const CircleIndicator = ({
  color = DEFAULT_COLOR,
  duration = DEFAULT_DURATION,
  backgroundCircleColor = DEFAULT_BACKGROUND_COLOR,
  size = DEFAULT_CIRCLE_SIZE,
}: CircleIndicatorProps) => {
  const radius = useMemo(() => size / 2 - 6, [size]);
  const percent = useSharedValue(0); // 从左侧开始

  const path = Skia.Path.Make();

  path.addCircle(radius + 5, radius + 5, radius);

  useEffect(() => {
    percent.value = withRepeat(withTiming(1, { duration }), -1);
  }, [duration, percent]);

  const pathAnimation = useDerivedValue(() => {
    const path = Skia.Path.Make();
    path.addCircle(radius + 5, radius + 5, radius);

    if (percent.value <= 0.25) {
      path.trim(0.75, percent.value + 0.75, false);
    } else {
      path.trim(0, percent.value - 0.25, false);
      const path1 = Skia.Path.Make();
      path1.addCircle(radius + 5, radius + 5, radius);
      path1.trim(0.75, 1, false);
      path.addPath(path1);
    }

    return path;
  });

  const circleCom = useMemo(
    () => (
      <Path
        path={pathAnimation}
        color={color}
        style="stroke"
        strokeWidth={10}
        strokeCap="round"
      />
    ),
    [color, pathAnimation]
  );

  return (
    <Canvas style={{ width: size, height: size }}>
      <Circle
        cx={radius + 5}
        cy={radius + 5}
        r={radius}
        color={backgroundCircleColor}
        style="stroke"
        strokeWidth={10}
      />
      {circleCom}
    </Canvas>
  );
};

export default memo(CircleIndicator);
