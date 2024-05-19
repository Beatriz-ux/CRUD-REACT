import React from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { Axios, AxiosError } from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);

    // Iniciando o state com os valores dos campos vazios
    this.state = {
      email: "",
      password: "",
    };
  }

  // Função responsável por realizar o login
  async sendLogin(event) {
    event.preventDefault();

    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    if (!data.email || data.email === "") {
      window.alert("E-mail é obrigatório");
      return;
    }

    if (!data.password || data.password === "") {
      window.alert("Senha é obrigatória");
      return;
    }

    try {
      let res = await authService.sendLogin(data);
      console.log("res", res);
      if (res.status === 200) {
        authService.setLoggedUser(res.data.data);
        // this.props.onLogin();
        this.props.navigate("/");
      } else {
        window.alert("Credenciais inválidas.");
      }
    } catch (error) {
      if (error instanceof AxiosError){
          window.alert(error.response.data);
      }else{
        window.alert("Erro ao efetuar login.");
      }
      console.log("error", error);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-body">
            <form onSubmit={(e) => this.sendLogin(e)}>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Insira seu email"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Insira sua senha"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// Função para encapsular o componente de classe com `useNavigate`
function LoginWrapper(props) {
  const navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}

export default LoginWrapper;
