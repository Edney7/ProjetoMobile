import React, { Component } from "react";
import { Keyboard, ActivityIndicator, Alert } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
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
  
    this.setState({ loading: true });
  
    try {
      // Busca receitas pelo nome
      const response = await api.get(`search.php?s=${newRecipe}`);
      const meals = response.data.meals;
  
      if (!meals || meals.length === 0) {
        Alert.alert("Erro", "Receita não encontrada!");
        return;
      }
  
      // Pega a primeira receita encontrada
      const foundRecipe = meals[0];
  
      // Verifica se a receita já foi adicionada
      if (recipes.find(recipe => recipe.idMeal === foundRecipe.idMeal)) {
        Alert.alert("Erro", "Receita já adicionada!");
        return;
      }
  
      // Cria o objeto com os dados da API
      const newRecipeData = {
        idMeal: foundRecipe.idMeal,
        name: foundRecipe.strMeal,
        strMealThumb: foundRecipe.strMealThumb,
        category: foundRecipe.strCategory,
        instructions: foundRecipe.strInstructions,
      };
  
      this.setState({
        recipes: [...recipes, newRecipeData],
        newRecipe: "",
        loading: false,
      });
  
      Keyboard.dismiss();
      
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar a receita");
      this.setState({ loading: false });
    }
  };

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
  keyExtractor={(recipe) => recipe.idMeal}
  renderItem={({ item }) => (
    <Recipe>
      <Avatar source={{ uri: item.strMealThumb }} />
      <Name>{item.name}</Name>
      <Bio>{item.category}</Bio>
      <ProfileButton
        onPress={() => {
          this.props.navigation.navigate("Recipe", { recipe: item });
        }}
      >
        <ProfileButtonText>Ver receita</ProfileButtonText>
      </ProfileButton>
      <ProfileButton
        onPress={() => {
          this.setState({recipes: recipes.filter(recipe => recipe.idMeal !== item.idMeal)})
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
