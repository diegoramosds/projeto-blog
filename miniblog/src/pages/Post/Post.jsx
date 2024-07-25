import styles from './Post.module.css'

import { Link, useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { FaSpinner } from 'react-icons/fa';
import Tags from '../../components/Tags';


const Post = () => {
    const { id } = useParams();
    const {document : post, loading} = useFetchDocument("posts", id);
  return (
    <div className={styles.post_container}>
        {loading && (
           <p className="spinner"><FaSpinner /></p>
          )}
        {post && (
          <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p className={styles.bodyPost}>{post.body}</p>
          <h3>Esse post é sobre:</h3>
          
          {post.tagsArray && <Tags tags={post.tagsArray} />}
            
          
          <p>
            <Link to="/" className="btn btn-dark">Voltar</Link>
          </p>
          </>
        )}
    </div>
  )
}

export default Post