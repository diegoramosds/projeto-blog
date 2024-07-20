import { Link } from "react-router-dom"
import styles from "./About.module.css"


const About = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre  <span>Blog</span></h2>
      <p>Consiste em um blog para  usuario fazer suas postagens, Desevolvido em React js no front-end e firebase no back-end.</p>
      <Link to={"/posts/create"} className="btn" >Criar seu post</Link>
    </div>
  )
}

export default About