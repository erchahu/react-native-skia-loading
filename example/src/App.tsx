import { View, StyleSheet } from 'react-native';
import { SkiaLoadingView, Spin } from 'react-native-skia-loading';

export default function App() {
  return (
    <View style={styles.container}>
      <SkiaLoadingView color="#a8324c" style={styles.box} />
      <Spin />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
