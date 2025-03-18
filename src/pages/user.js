import React, { Component } from "react";
import { FlatList } from "react-native";
import api from "../services/api";
import {
  Container,
  Header,
  AvatarPerfil,
  NamePerfil,
  BioPerfil,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from "../styles";

export default class User extends Component {
  state = {
    stars: [],
  };

  async componentDidMount() {
    const { route } = this.props;
    const { user } = route.params;

    try {
      const response = await api.get(`/users/${user.login}/starred`);
      this.setState({ stars: response.data });
    } catch (error) {
      console.error("Erro ao buscar repositórios estrelados:", error);
    }
  }

  render() {
    const { route } = this.props;
    const { user } = route.params;
    const { stars } = this.state;

    return (
      <Container>
        <Header>
          <AvatarPerfil source={{ uri: user.avatar }} />
          <NamePerfil>{user.name}</NamePerfil>
          <BioPerfil>{user.bio}</BioPerfil>
        </Header>

        <Stars>Repositórios Estrelados</Stars>

        <FlatList
          data={stars}
          keyExtractor={(star) => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}
