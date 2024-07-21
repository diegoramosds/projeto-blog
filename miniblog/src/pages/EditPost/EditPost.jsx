import styles from "./EditPost.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { FaSpinner } from "react-icons/fa";

const EditPost = () => {
  const {id} = useParams();
  const { document : post }  = useFetchDocument("posts", id);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);
      
      const texTags = post.tagsArray.join(", ")
      setTags(texTags);
    }
}, [post]);

const [title, setTitle] = useState("");
const [image, setImage] = useState("");
const [body, setBody] = useState("");
const [tags, setTags] = useState([]);
const [formError, setFormError] = useState("");

const {user} = useAuthValue();

const {updateDocument, response} = useUpdateDocument("posts");

const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  setFormError("")

  // validate image url
  try {
    new URL(image)
  } catch (error) {
    setFormError("A imagem precisa ser uma URL");
  }


  // criar array de tags
  const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

  //checar os valores
  if(!title || !image || !body || !tags) {
    setFormError("Preencha todos os campos");
  }

  const data = {
    title,
    image,
    body,
    tagsArray,
    uid: user.uid,
    createdBy: user.displayName,
  }

  updateDocument(id, data);

  //redirect to home
  navigate("/dashboard");

}

  return (
    <div className={styles.edit_post}>
        {post && (
          <>
          <h2>Editar Post: {post.title}</h2>
        <p>Faça alterações ds dados do post</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Titulo:</span>
            <input type="text" required 
            placeholder="Pense em um titulo criativo..."
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title} />
          </label>
          <label>
            <span>Url da imagem:</span>
            <input type="text" required 
            placeholder="Insira uma imagem que representa o post"
            name="image"
            onChange={(e) => setImage(e.target.value)}
            value={image} />
          </label>
          <p className={styles.preview_title}>Preview da imagem atual:</p>
          <img className={styles.image_preview} src={post.image} alt={post.title} />
          <label>
            <span>Conteúdo:</span>
            <input type="text" required 
            placeholder="Insira o conteúdo do post"
            name="image"
            onChange={(e) => setBody(e.target.value)}
            value={body} />
          </label>
          <label>
            <span>Tags:</span>
            <input type="text" required 
            placeholder="Insira as tags separadas por vírgulas"
            name="image"
            onChange={(e) => setTags(e.target.value)}
            value={tags} />
          </label>

          {!response.loading &&  <button className="btn">Editar</button>}
          {response.loading &&  <button className="btn" disabled><FaSpinner className="spinner" /></button>}

          {response.error && <p className="error">{response.error}</p>}

          {formError && <p className="error">{formError}</p>}
         
        </form>
        </>
        )}
        
    </div>
  )
}

export default EditPost