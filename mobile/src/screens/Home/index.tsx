import { Image, StyleSheet, Text, View, FlatList } from 'react-native';
import logoImg from '../../assets/logo-nlw-esports.png';
import GameCard from '../../components/GameCard';
import Heading from '../../components/Heading';
import { GAMES } from '../../utils/games';

const Home = () => {
  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logo} />
      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />
      <FlatList
        data={GAMES}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <GameCard data={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      />
    </View>
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
