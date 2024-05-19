import React from "react";
import { Link, useNavigate } from "react-router-dom";
import postsService from "../../services/posts.service";
import "./post-list.page.css";
import PageTop from "../../components/page-top/page-top.component";

// Componente funcional que usa hooks para obter o navegador e passar para o componente de classe
function PostListPageWrapper(props) {
  const navigate = useNavigate();
  return <PostListPage {...props} navigate={navigate} />;
}

class PostListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Atributo para armazenar o array de posts vindos da API.
      posts: [],
    };
  }

  // Função que é executada assim que o componente carrega.
  componentDidMount() {
    this.loadPosts();
  }

  // Função responsável por chamar o serviço e carregar os posts.
  async loadPosts() {
    try {
      let res = await postsService.list();
      this.setState({ posts: res.data.data });
    } catch (error) {
      console.log(error);
      alert("Não foi possível listar os posts.");
    }
  }

  render() {
    return (
      <div className="container">
        <PageTop title="Posts" desc="Veja todos os posts disponíveis">
          <button
            className="btn btn-primary"
            onClick={() => this.props.navigate("/post-add")}
          >
            Adicionar
          </button>
        </PageTop>

        {/* Percorrendo o array de posts do state e renderizando cada um
                dentro de um link que leva para a página de detalhes do post específico */}
        {this.state.posts.map((post) => (
          <Link to={"/post-detail/" + post.id} key={post.id}>
            <div className="post-card">
              <div className="post-card__img">
                <img src={post.imageUrl} alt={post.title} />
              </div>
              <div className="post-card__text">
                <h4>{post.title}</h4>
                <p>{post.content}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

export default PostListPageWrapper;
