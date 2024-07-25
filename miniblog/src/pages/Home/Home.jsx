import styles from "./Home.module.css"


import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";
import { FaSpinner } from "react-icons/fa";

const Home = () => {
  const [query, setQuery] = useState("");
  const {documents : posts, loading} = useFetchDocuments("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query.toLowerCase()}`);
    }
  }
  return (
    <div className={styles.home}>
      <h1>Veja aqui os posts</h1>  
     <form onSubmit={handleSubmit} className={styles.search_form}>
        <input type="text"
        placeholder="Busque por tags aqui..." 
        onChange={(e) => setQuery(e.target.value)}/>
        <button className="btn btn-dark">Procurar</button>
     </form>
     <div>
        {loading && <p className="spinner"><FaSpinner/></p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />
        )}
        {posts && posts.length === 0 && (
          <div className={styles.no_posts}>
            <p>Não foi encontrado posts</p>
            <Link to="/posts/create" className="btn">Criar primeiro post</Link>
          </div>
        )}
     
     </div>
    </div>
  )
}

export default Home;