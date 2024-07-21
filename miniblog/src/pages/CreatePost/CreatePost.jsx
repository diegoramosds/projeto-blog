import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { FaSpinner } from "react-icons/fa";

const CreatePost = () => {

const [title, setTitle] = useState("");
const [image, setImage] = useState("");
const [body, setBody] = useState("");
const [tags, setTags] = useState([]);
const [formError, setFormError] = useState("");

const {user} = useAuthValue();

const {insertDocument, response, loading} = useInsertDocument("posts");
const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  setFormError("")


  try {
    new URL(image)
  } catch (error) {
    setFormError("A imagem precisa ser uma URL");
  }



  const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());


  if(!title || !image || !body || !tags) {
    setFormError("Preencha todos os campos");
  }

  insertDocument({
    title,
    image,
    body,
    tagsArray,
    uid: user.uid,
    createdBy: user.displayName,
  })


  navigate("/");
}
  return (
    <div className={styles.create_post}>
      {loading && <p className="spinner"><FaSpinner/></p>}
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

          {formError && <p className="error">{formError}</p>}
         
        </form>
        
    </div>
  )
}

export default CreatePost