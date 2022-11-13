import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logoImg from '../../assets/logo-nlw-esports.png';
import Background from '../../components/Background';
import { GameParams } from '../../@types/navigation';
import { Entypo } from '@expo/vector-icons';
import { THEME } from '../../theme';
import Heading from '../../components/Heading';
import DuoCard, { DuoCardProps } from '../../components/DuoCard';
import { useEffect, useState } from 'react';

interface RouteParams {
  id: string;
  title: string;
  bannerUrl: string;
}

const Game = () => {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  const route = useRoute();
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const game = route.params as GameParams;

  useEffect(() => {
    fetch(`http://192.168.0.21:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data));
  }, []);
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right}></View>
        </View>
        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
        <Heading title={game.title} subtitle="Conecte-se e comece a jogar" />
        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.emptyListContent
          ]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              {' '}
              Não há anúncios publicados para este jogo ainda
            </Text>
          )}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => {}} />
          )}
        />
      </SafeAreaView>
    </Background>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 28,
    justifyContent: 'space-around'
  },
  logo: {
    width: 72,
    height: 40
  },
  right: {
    width: 20,
    height: 20
  },
  cover: {
    width: 311,
    height: 160,
    borderRadius: 8,
    marginTop: 32
  },
  containerList: {
    width: '100%'
  },
  contentList: {
    paddingLeft: 32,
    paddingRight: 64,
    alignItems: 'flex-start'
  },
  emptyListText: {
    color: THEME.COLORS.CAPTION_300,
    fontSize: THEME.FONT_SIZE.SM,
    fontFamily: THEME.FONT_FAMILY.REGULAR
  },
  emptyListContent: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
