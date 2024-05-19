import React from "react";
import authService from "../../services/auth.service";
import { Navigate } from "react-router-dom";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Atributo para armazenar o usuário
      redirect: null,
    };
  }

  componentDidMount() {
    let user = authService.getLoggedUser();
    if (!user) {
      this.setState({ redirect: "/login" });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    return (
      <div>
        <h1>Home Page</h1>
      </div>
    );
  }
}

export default HomePage;
