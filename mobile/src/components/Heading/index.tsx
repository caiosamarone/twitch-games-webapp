import { StyleSheet, Text, View, ViewProps } from 'react-native';
import { THEME } from '../../theme';

interface HeadingProps extends ViewProps {
  title: string;
  subtitle: string;
}

const Heading = ({ title, subtitle, ...rest }: HeadingProps) => {
  return (
    <View style={styles.container} {...rest}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 32,
    paddingBottom: 32
  },
  title: {
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.LG,
    fontFamily: THEME.FONT_FAMILY.BLACK
  },
  subtitle: {
    color: THEME.COLORS.CAPTION_400,
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.REGULAR
  }
});
