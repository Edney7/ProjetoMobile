// import React, { Component } from "react";
// import api from "../services/api";
// import {
//   Container,
//   Header,
//   AvatarPerfil,
//   NamePerfil,
//   BioPerfil,
//   Stars as IngredientsList,
//   Starred as IngredientItem,
//   OwnerAvatar,
//   Info,
//   Title,
//   Author,
// } from "../styles";

// // export default class Recipe extends Component {
// //   state = {
// //     ingredients: [],
// //   };


// export default class Recipe extends Component {
//   render() {
//     const { route } = this.props;
//     const { recipe } = route.params;

//     return (
//       <ScrollView style={styles.container}>
//         <Image source={{ uri: recipe.thumbnail }} style={styles.image} />
//         <Text style={styles.title}>{recipe.name}</Text>
//         <Text style={styles.category}>Categoria: {recipe.category}</Text>
//         <Text style={styles.instructions}>{recipe.instructions}</Text>
//       </ScrollView>
//     );
//   }
// }


//   // async componentDidMount() {
//   //   const { route } = this.props;
//   //   const { user } = route.params;

//   //   const response = await api.get(`/users/${user.login}/starred`);
//   //   this.setState({ stars: response.data });
//   // }


//   // async componentDidMount() {
//   //   // Simulando ingredientes de uma API ou banco de dados
//   //   const fakeIngredients = [
//   //     { id: 1, name: "2 xícaras de farinha", owner: { avatar_url: "https://via.placeholder.com/50", login: "Farinha" } },
//   //     { id: 2, name: "1 xícara de açúcar", owner: { avatar_url: "https://via.placeholder.com/50", login: "Açúcar" } },
//   //     { id: 3, name: "3 ovos", owner: { avatar_url: "https://via.placeholder.com/50", login: "Ovos" } },
//   //     { id: 4, name: "1/2 xícara de leite", owner: { avatar_url: "https://via.placeholder.com/50", login: "Leite" } },
//   //   ];

//   //   this.setState({ ingredients: fakeIngredients });
//   // }

//   render() {
//     const { route } = this.props;
//     const { recipe } = route.params;
//     const { ingredients } = this.state;
//   }
//     return (
//       <Container>
//         <Header>
//           <AvatarPerfil source={{ uri: user.avatar }} />
//           <NamePerfil>{recipe.name}</NamePerfil>
//           <BioPerfil>{recipe.bio}</BioPerfil>
//         </Header>

//         <IngredientsList
//           data={ingredients}
//           keyExtractor={(item) => String(item.id)}
//           renderItem={({ item }) => (
//             <IngredientItem>
//               <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
//               <Info>
//                 <Title>{item.name}</Title>
//                 <Author>{item.owner.login}</Author>
//               </Info>
//             </IngredientItem>
//           )}
//         />

//       </Container>
//     )
//   }



import React, { Component } from "react";
import { ScrollView, Image, Text } from "react-native";
import api from "../services/api";
import {
  Container,
  Header,
  AvatarPerfil,
  NamePerfil,
  BioPerfil,
  Stars as IngredientsList,
  Starred as IngredientItem,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from "../styles";

export default class Recipe extends Component {
  state = {
    ingredients: [],
  };

  async componentDidMount() {
    // Simulando ingredientes de uma API ou banco de dados
    const fakeIngredients = [
      { id: 1, name: "2 xícaras de farinha", owner: { avatar_url: "https://via.placeholder.com/50", login: "Farinha" } },
      { id: 2, name: "1 xícara de açúcar", owner: { avatar_url: "https://via.placeholder.com/50", login: "Açúcar" } },
      { id: 3, name: "3 ovos", owner: { avatar_url: "https://via.placeholder.com/50", login: "Ovos" } },
      { id: 4, name: "1/2 xícara de leite", owner: { avatar_url: "https://via.placeholder.com/50", login: "Leite" } },
    ];

    this.setState({ ingredients: fakeIngredients });
  }

  render() {
    const { route } = this.props;
    const { recipe } = route.params;
    const { ingredients } = this.state;
  
    return (
      <Container>
        <Header>
          <AvatarPerfil source={{ uri: recipe.thumbnail }} />
          <NamePerfil>{recipe.name}</NamePerfil>
          <BioPerfil>{recipe.category}</BioPerfil>
        </Header>

        <IngredientsList
          data={ingredients}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <IngredientItem>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </IngredientItem>
          )}
        />
      </Container>
    );
  }
}