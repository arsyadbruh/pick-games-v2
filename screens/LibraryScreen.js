import React from "react";
import {
  Checkbox,
  Box,
  Center,
  Text,
  Button,
  Flex,
  Modal,
  Spinner,
  FlatList,
  HStack,
  Heading,
  Icon,
} from "native-base";
import { Header, GameCardItem } from "../components";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

/**
 * Component untuk membuat button quickfilter
 * @param {*} props onPress, value, filterValue, text
 * @param {string} value value dari state atau value filter sebelumnya
 * @param {string} filterValue value dari component atau value untuk perbandingan
 * @param {string} text Text yang akan ditampilkan pada button
 * @param {object} onPress Function untuk handle filter
 * @returns
 */
const QuickFilterButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text
        bg={props.value === props.filterValue ? "white" : "#2a2e33"}
        color={props.value === props.filterValue ? "#2a2e33" : "white"}
        fontSize={"16px"}
        px={3}
        borderRadius={"md"}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

class LibraryScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.sorting = "release-date";
    this.platform = "pc";
    this.state = {
      isRefresh: false,
      isLoading: true,
      games: [],
      groupValues: [],
      showModal: false,
    };
    this.category = [
      "mmorpg",
      "shooter",
      "strategy",
      "moba",
      "racing",
      "sports",
      "social",
      "sandbox",
      "open-world",
      "survival",
      "pvp",
      "pve",
      "pixel",
      "voxel",
      "zombie",
      "turn-based",
      "first-person",
      "third-Person",
      "top-down",
      "tank",
      "space",
      "sailing",
      "side-scroller",
      "superhero",
      "permadeath",
      "card",
      "battle-royale",
      "mmo",
      "mmofps",
      "mmotps",
      "3d",
      "2d",
      "anime",
      "fantasy",
      "sci-fi",
      "fighting",
      "action-rpg",
      "action",
      "military",
      "martial-arts",
      "flight",
      "low-spec",
      "tower-defense",
      "horror",
      "mmorts",
    ];
  }

  getListGameWithFilter = async () => {
    let urlApi = `https://www.freetogame.com/api/games?sort-by=${this.sorting}&platform=${this.platform}`;
    if (this.state.groupValues.length != 0) {
      const tags = this.state.groupValues.join(".");
      urlApi = `https://www.freetogame.com/api/filter?tag=${tags}&platform=${this.platform}&sort-by=${this.sorting}`;
    }
    console.log(urlApi);
    try {
      const response = await fetch(urlApi);
      const listGame = await response.json();
      this.setState({ games: listGame });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({
        isRefresh: false,
        isLoading: false,
      });
    }
  };

  handlQuickFilter = (filterBy) => {
    switch (filterBy) {
      case "date":
        this.sorting = "release-date";
        break;
      case "popular":
        this.sorting = "popularity";
        break;
      case "alphabet":
        this.sorting = "alphabetical";
        break;
      case "pc":
        this.platform = "pc";
        break;
      case "browser":
        this.platform = "browser";
        break;
    }

    this.setState(
      {
        isRefresh: true,
        isLoading: true,
      },
      () => this.getListGameWithFilter()
    );
  };

  componentDidMount() {
    this.getListGameWithFilter();
  }

  render() {
    const { isLoading, isRefresh, games, groupValues, showModal } = this.state;
    return (
      <>
        <Header title={"Library"} />

        {/* Sorting section */}
        <Box bg={"#2a2e33"} px={5} pt={7} pb={3}>
          <HStack space={5}>
            <Text color={"white"} fontWeight={"bold"} fontSize={"16px"}>
              Sort By
            </Text>
            <QuickFilterButton
              value={this.sorting}
              filterValue="release-date"
              text="Date"
              onPress={() => this.handlQuickFilter("date")}
            />
            <QuickFilterButton
              value={this.sorting}
              filterValue="popularity"
              text="Popularity"
              onPress={() => this.handlQuickFilter("popular")}
            />
            <QuickFilterButton
              value={this.sorting}
              filterValue="alphabetical"
              text="A - Z"
              onPress={() => this.handlQuickFilter("alphabet")}
            />
          </HStack>
        </Box>

        {/* Platform */}
        <Box bg={"#2a2e33"} px={5}>
          <HStack space={5}>
            <Text color={"white"} fontWeight={"bold"} fontSize={"16px"}>Platform</Text>
            <QuickFilterButton
              value={this.platform}
              filterValue="pc"
              text="PC (Windows)"
              onPress={() => this.handlQuickFilter("pc")}
            />
            <QuickFilterButton
              value={this.platform}
              filterValue="browser"
              text="Browser"
              onPress={() => this.handlQuickFilter("browser")}
            />
          </HStack>
        </Box>

        {/* Filter button section */}
        <Box bg={"#2a2e33"} px={3} pb={5} pt={3}>
          <Button
            onPress={() => this.setState({ showModal: true })}
            size={"sm"}
            bg={"#1984b9"}
            leftIcon={<Icon as={AntDesign} name="filter" size="sm" color={"white"} />}>
            <Text color={"white"}>Category ( {groupValues.length} )</Text>
          </Button>
          <Modal
            isOpen={showModal}
            onClose={() => this.setState({ showModal: false, groupValues: [] })}>
            <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header>
                <Heading>Category</Heading>
              </Modal.Header>
              <Modal.Body>
                <Checkbox.Group
                  onChange={(props) => this.setState({ groupValues: props })}
                  value={groupValues}
                  accessibilityLabel="choose Category">
                  <Flex flexDirection={"row"} flexWrap={"wrap"}>
                    {this.category.map((item, index) => (
                      <Box width={"50%"} key={index}>
                        <Checkbox value={item} my={2} mx={2}>
                          <Text ml={2}>{item}</Text>
                        </Checkbox>
                      </Box>
                    ))}
                  </Flex>
                </Checkbox.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    colorScheme="danger"
                    onPress={() => {
                      this.setState({ groupValues: [] });
                    }}>
                    Clear
                  </Button>
                  <Button
                    onPress={() => {
                      this.setState(
                        {
                          showModal: false,
                          isLoading: true,
                          isRefresh: true,
                        },
                        () => this.getListGameWithFilter()
                      );
                    }}>
                    Save
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </Box>

        {isLoading ? (
          <Center flex={1} bg={"#2a2e33"}>
            <Spinner size={"lg"} colorScheme={"primary"} />
          </Center>
        ) : games.status != undefined ? (
          <Center flex={1} bg={"#2a2e33"}>
            <Text color={"white"}>No game in list</Text>
          </Center>
        ) : (
          <FlatList
            data={games}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <GameCardItem data={item} />}
            bg={"#2a2e33"}
            onRefresh={
              (() => {
                this.setState({
                  isLoading: true,
                  isRefresh: true,
                });
              },
              () => this.getListGameWithFilter())
            }
            refreshing={isRefresh}
          />
        )}
      </>
    );
  }
}

export default LibraryScreen;
