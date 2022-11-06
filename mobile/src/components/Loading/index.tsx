import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { THEME } from '../../theme';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={THEME.COLORS.PRIMARY} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
