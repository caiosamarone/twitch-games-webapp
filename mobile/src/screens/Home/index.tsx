import { useEffect, useState } from 'react';
import { Image, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/logo-nlw-esports.png';
import Background from '../../components/Background';
import GameCard, { GameCardProps } from '../../components/GameCard';
import Heading from '../../components/Heading';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  const handleOpenGame = ({ id, bannerUrl, title }: GameCardProps) => {
    navigation.navigate('game', { id, bannerUrl, title });
  };
  console.log(games);
  useEffect(() => {
    fetch('http://192.168.0.10:3333/games')
      .then(response => response.json())
      .then(data => setGames(data));
  }, []);
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />
        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    width: 214,
    height: 120,
    marginTop: 74,
    marginBottom: 48
  },
  contentList: {
    paddingLeft: 32,
    paddingHorizontal: 64,
    paddingBottom: 60
  }
});
