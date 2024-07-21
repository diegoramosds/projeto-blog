import styles from "./Search.module.css";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import PostDetail from "../../components/PostDetail";
import { Link } from "react-router-dom";

const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const {documents : posts} = useFetchDocuments("posts", search);
    
  return (
    <div className={styles.search_container}>
        <h2>Resultado da sua busca</h2>
        <div>
          {posts && posts.length === 0 && (
            <div className={styles.no_posts}>
            <p>Não foi encontrado posts relacionados a sua busca...</p>
            <Link to="/" className="btn btn-dark">Voltar</Link>
            </div>
          )}
          {posts && posts.map((post) => (
            <PostDetail key={post.id} post={post}/>
          ))}
        </div>
    </div>
  )
}

export default Search