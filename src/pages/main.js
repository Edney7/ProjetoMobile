import React, { Component } from "react";
import { Keyboard, ActivityIndicator, Alert } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User as Recipe,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from "../styles";
export default class Main extends Component {
  state = {
    newRecipe: "",
    recipes: [],
    loading: false,
  };

  async componentDidMount() {
    const recipes = await AsyncStorage.getItem("recipes");
    if (recipes) {
      this.setState({ users: JSON.parse(recipes) });
    }
  };

  componentDidUpdate(_, prevState) {
    const { recipes } = this.state;
    if (prevState.recipes !== recipes) {
      AsyncStorage.setItem("recipes", JSON.stringify(recipes));
    }
  };


  
  handleAddRecipe = async () => {
    const { recipes, newRecipe } = this.state;

    if (!newRecipe.trim()) {
      Alert.alert("Erro", "O nome da receita não pode estar vazio!");
      return;
    }

    if (recipes.find((recipe) => recipe.name.toLowerCase() === newRecipe.toLowerCase())) {
      Alert.alert("Erro", "Receita já adicionada!");
      return;
    }

    const newRecipeData = {
      name: newRecipe,
      avatar: "https://via.placeholder.com/150", // Placeholder para imagem da receita
      bio: "Uma deliciosa receita para você experimentar!", // Descrição genérica
    };

    this.setState({
      recipes: [...recipes, newRecipeData],
      newRecipe: "",
      loading: false,
    });

    Keyboard.dismiss();
  };



  // handleAddUser = async () => {
  //   try {
  //     const { recipes, newRecipe.state;
  //     this.setState({ loading: true });
  //     const response = await api.get(`/recipes/${newRecipe}`);
  //     if (recipes.find((recipe) => recipe.login === response.data.login)) {
  //       alert("Usuário já adicionado!");
  //       this.setState({ loading: false });
  //       return;
  //     }
  //     const data = {
  //       name: response.data.name,
  //       login: response.data.login,
  //       bio: response.data.bio,
  //       avatar: response.data.avatar_url,
  //     };
  //     console.log(data);

  //     this.setState({
  //       users: [...users, data],
  //       newUser: "",
  //       loading: false,
  //     });
  //     Keyboard.dismiss();
  //   } catch (error) {
  //     alert("Usuário não encontrado!");
  //     this.setState({ loading: false });
  //   }
  // };

  render() {
    const { recipes, newRecipe, loading } = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar receita"
            value={newRecipe}
            onChangeText={(text) => this.setState({ newRecipe: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddRecipe}
          />
          <SubmitButton loading={loading} onPress={this.handleAddRecipe}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>
        <List
          showsVerticalScrollIndicator={false}
          data={recipes}
          keyExtractor={(recipe) => recipe.name}
          renderItem={({ item }) => (
            <Recipe>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ProfileButton
                onPress={() => {
                  this.props.navigation.navigate("Recipe", { recipe: item });
                }}
              >
                <ProfileButtonText>Ver receita</ProfileButtonText>
              </ProfileButton>
              <ProfileButton
                onPress={() => {
                  this.setState({recipes: recipes.filter(recipe => recipe.login !== item.login)})
                }}
                style={{backgroundColor: "#FFC0CB"}}
              >
                <ProfileButtonText>Remover</ProfileButtonText>
              </ProfileButton>
            </Recipe>
          )}
        />
      </Container>
    );
  }
};
