import { View, StyleSheet } from 'react-native';
import { CircleIndicator, Spin } from 'react-native-skia-loading';

export default function App() {
  return (
    <View style={styles.container}>
      <CircleIndicator color="#d5e70e" backgroundCircleColor="black" />
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
