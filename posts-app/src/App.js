import React from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/login/login.page";
import PostListPage from "./pages/post-list/post-list.page";
import PostEditPage from "./pages/post-edit/post-edit.page";
import PostDetailPage from "./pages/post-detail/post-detail.page";
import authService from "./services/auth.service";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Atributo para armazenar o usuário log
      user: null,
    };
  }

  // Função que é executada assim que o componente carrega
  componentDidMount() {
    // Chamando a função que verifica se o usuário está logado
    this.loadUserData();
  }

  // Função que verifica se o usuário está logado
  loadUserData() {
    let user = authService.getLoggedUser();
    if (user) {
      this.setState({ user: user });
    }
  }

  // Função que faz o logout do usuário
  logout() {
    authService.clearLoggedUser();
    window.location.reload();
  }
  render() {
    return (
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            Post App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMenu"
            aria-controls="navbarMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarMenu">
            <div className="navbar-nav">
              <Link to="/" className="nav-item nav-link">
                Home
              </Link>
              <Link to="/post-list" className="nav-item nav-link">
                Posts
              </Link>
              {this.state.user ? (
                <button
                  className="nav-item nav-link btn btn-link"
                  onClick={() => this.logout()}
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="nav-item nav-link">
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/post-list" element={<PostListPage />} />
          <Route path="/post-detail/:id" element={<PostDetailPage />} />
          <Route path="/post-edit/:id" element={<PostEditPage />} />
          <Route path="/post-add" element={<PostEditPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
