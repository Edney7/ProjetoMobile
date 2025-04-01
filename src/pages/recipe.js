import React, { useEffect, useState } from "react";
import { ScrollView, Image, Text, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

const Recipe = ({ route }) => {
  const { recipe } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe.name}`);
        const meal = response.data.meals ? response.data.meals[0] : null;
        setDetails(meal);
      } catch (error) {
        console.error("Erro ao buscar receita:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipe.name]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!details) {
    return <Text style={styles.errorText}>Receita não encontrada!</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: details.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{details.strMeal}</Text>
      <Text style={styles.instructions}>{details.strInstructions}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  instructions: {
    fontSize: 16,
    textAlign: "justify",
    lineHeight: 24,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default Recipe;
