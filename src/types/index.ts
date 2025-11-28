export interface LoadingProps {
  duration?: number;
}

export interface BaseLoadingProps extends LoadingProps {
  color?: string;
  size?: number;
}

// Spin
export interface SpinProps extends BaseLoadingProps {}

// CircleIndicator
export interface CircleIndicatorProps extends BaseLoadingProps {
  backgroundCircleColor?: string;
}
