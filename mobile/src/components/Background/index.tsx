import { THEME } from '../../theme';
import { ImageBackground, StyleSheet } from 'react-native';
import backgroundImg from '../../assets/background-galaxy.png';

interface Props {
  children: React.ReactNode;
}

const Background = ({ children }: Props) => {
  return (
    <ImageBackground
      source={backgroundImg}
      defaultSource={backgroundImg}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.BACKGROUND_800
  }
});
