import styles from './Post.module.css'

//hooks
import { Link, useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument';


const Post = () => {
    const { id } = useParams();
    const {document : post} = useFetchDocument("posts", id);
  return (
    <div className={styles.post_container}>
        {post && (
          <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>Esse post é sobre:</h3>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
             <p key={tag}><span>#</span>{tag}</p>
            ))}
            
          </div>
          <Link to="/" className="btn btn-dark">Voltar</Link>
          </>
        )}
    </div>
  )
}

export default Post