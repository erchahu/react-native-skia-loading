import { useEffect, useMemo } from 'react';
import { Canvas, Circle, Group } from '@shopify/react-native-skia';
import { memo } from 'react';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import type { SpinProps } from '../types';
import { DEFAULT_CIRCLE_SIZE, DEFAULT_COLOR } from '../constants';

const Spin = ({
  color = DEFAULT_COLOR,
  size = DEFAULT_CIRCLE_SIZE,
  duration = 3000,
}: SpinProps) => {
  const { radius, center, circlePositions } = useMemo(() => {
    const radius = size / 8;
    const center = size / 2;
    const offset = size / 4;

    const circlePositions = [
      { x: center, y: center - offset, opacity: 0.3 },
      { x: center + offset, y: center, opacity: 0.5 },
      { x: center, y: center + offset, opacity: 0.7 },
      { x: center - offset, y: center, opacity: 0.9 },
    ];

    return { radius, center, circlePositions };
  }, [size]);

  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(2 * Math.PI, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [rotation, duration]);

  const transform = useDerivedValue(() => [{ rotate: rotation.value }]);

  return (
    <Canvas style={{ width: size, height: size }}>
      <Group transform={transform} origin={{ x: center, y: center }}>
        {circlePositions.map((position, index) => (
          <Circle
            key={index}
            cx={position.x}
            cy={position.y}
            r={radius}
            color={color}
            opacity={position.opacity}
          />
        ))}
      </Group>
    </Canvas>
  );
};

export default memo(Spin);
