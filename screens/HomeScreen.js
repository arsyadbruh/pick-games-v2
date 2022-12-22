import React from "react";
import {
  Box,
  Center,
  Text,
  Image,
  Spinner,
  FlatList,
  AspectRatio,
  View,
  Heading,
  HStack,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Header, GameCardItem } from "../components";

class HomeScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isRefresh: false,
      games: [],
    };
  }

  getListGame = async () => {
    let urlApi = `https://www.freetogame.com/api/games?sort-by=popularity`;
    try {
      const response = await fetch(urlApi);
      const listGame = await response.json(); // taruh hasil fetch json ke daftar games
      this.setState({ games: listGame.slice(0, 10) }); // limit 10 game popular
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({
        isLoading: false,
        isRefresh: false,
      });
    }
  };

  handleRefresh = () => {
    this.setState(
      {
        isRefresh: true,
        isLoading: true,
      },
      () => this.getListGame()
    );
  };

  componentDidMount() {
    this.getListGame();
  }

  render() {
    const { isLoading, isRefresh, games } = this.state;
    return (
      <>
        <Header title={"Home"} />

        {isLoading ? (
          <Center flex={1} bg={"#2a2e33"}>
            <Spinner size={"lg"} colorScheme={"primary"} />
          </Center>
        ) : (
          <FlatList
            data={games}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <GameCardItem data={item} />}
            bg={"#2a2e33"}
            onRefresh={this.handleRefresh}
            refreshing={isRefresh}
          />
        )}
      </>
    );
  }
}

export default HomeScreen;
