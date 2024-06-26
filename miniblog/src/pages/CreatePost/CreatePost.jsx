import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {

const [title, setTitle] = useState("");
const [image, setImage] = useState("");
const [body, setBody] = useState("");
const [tags, setTags] = useState([]);
const [formError, setFormError] = useState("");

const {user} = useAuthValue();

const {insertDocument, response} = useInsertDocument("posts");

const handleSubmit = (e) => {
  e.preventDefault();
  setFormError("")

  // validate image url

  // criar array de tags

  //checar os valores

  insertDocument({
    title,
    image,
    body,
    tags,
    uid: user.uid,
    createdBy: user.displayName,
  })

  //redirect to home
}

  return (
    <div className={styles.create_post}>
        <h2>Novo Post</h2>
        <p>Digite oque quiser e compartilhe seus conhecimentos</p>
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

          {!response.loading &&  <button className="btn">Cadastrar</button>}
         {response.loading &&  <button className="btn" disabled>Aguarde</button>}
          {response.error && <p className="error">{response.error}</p>}
         
        </form>
        
    </div>
  )
}

export default CreatePost