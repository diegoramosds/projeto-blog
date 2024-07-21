import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from "../../hooks/useDeleteDocuments";
import { useState } from "react";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents : posts, loading} = useFetchDocuments("posts", null, uid);
  const [isOpenDeleteModal,setOpenDeleteModal] =  useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  const { deleteDocument } = useDeleteDocument("posts");

  

  const openDeleteModal = (postId) => {
    setPostIdToDelete(postId);
    setOpenDeleteModal(true);
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
    setPostIdToDelete(null);
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  };

  const handleDelete = () => {
    deleteDocument(postIdToDelete);
    closeDeleteModal();
  };


  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.dashboard}>
        <h2>Dashboard</h2>
        <p>Gerencie seus posts</p>
        {posts && posts.length === 0 ? (
          <div className={styles.no_posts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">Criar primeiro post</Link>
          </div>
        ) : (
         <>
          <div className={styles.post_header}>
           <span>Titulo</span>
           <span>Ações</span>
          </div>
           {posts && posts.map((post) => <div key={post.id} className={styles.post_row}>
           <p>{post.title}</p>
           <div>
            <Link to={`/posts/${post.id}`} className="dashboard btn btn-outline">Ver</Link>
            <Link to={`/posts/edit/${post.id}`} className="dashboard btn btn-outline">Editar</Link>
            <button onClick={() => openDeleteModal(post.id)}  className="dashboard btn btn-outline btn-danger">Excluir</button>
           </div>

            </div>)}
         </>
         
        )}
        {isOpenDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Deseja apagar esse post?</h3>
            <button onClick={handleDelete} className={styles.confirmButton}>Sim</button>
            <button onClick={closeDeleteModal} className={styles.cancelButton}>Não</button>
          </div>
        </div>
      )}
    </div>
  )
}


export default Dashboard