/* eslint-disable react/prop-types */
import styles from "./PostDetail.module.css";

import { Link } from "react-router-dom";
import Tags from "./Tags";

 const PostDetail = ({ post }) => {
   return (
     <div className={styles.post_detail}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p  className={styles.createdby}><strong>Postado por</strong>: {post.createdBy}</p>

        {post.tagsArray && <Tags tags={post.tagsArray} />}
        
        <Link to={`/posts/${post.id}`} className="btn btn-outline">Ler</Link>
     </div>
   )
 }
 
 export default PostDetail;