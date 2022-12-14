import {
  StyleSheet,
  Text,
  View,
  Modal,
  ModalProps,
  TouchableOpacity,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import Heading from '../Heading';
import * as Clipboard from 'expo-clipboard';

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

const DuoMatch = ({ discord, onClose, ...props }: Props) => {
  const handleCopyToClipboard = async () => {
    await Clipboard.setStringAsync(discord);
    Alert.alert(
      'Discord copiado!',
      'Usuário copiado na sua área de transferência!'
    );
  };

  return (
    <Modal
      {...props}
      transparent
      statusBarTranslucent={true}
      animationType="fade"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle color={THEME.COLORS.SUCCESS} size={64} weight="bold" />
          <Heading
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: 'center', marginTop: 24 }}
          />
          <Text style={styles.label}>Adicione no Discord</Text>

          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyToClipboard}
          >
            <Text style={styles.discord}>{discord}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DuoMatch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.OVERLAY
  },
  content: {
    width: 311,
    backgroundColor: THEME.COLORS.SHAPE,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeIcon: {
    alignSelf: 'flex-end',
    margin: 16
  },
  label: {
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    marginTop: 24,
    marginBottom: 8
  },
  discordButton: {
    width: 231,
    height: 48,
    backgroundColor: THEME.COLORS.BACKGROUND_900,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 32
  },
  discord: {
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.REGULAR
  }
});
