import styles from "./Login.module.css"

import { useAuthentication } from "../../hooks/useAuthentication";
import { useState, useEffect } from "react"
import { FaSpinner } from "react-icons/fa";


 

const Login = () => {
  
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const { login, error: authError, loading} = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      email,
      password,
    }

    const res = await login(user)
    console.log(res)
  };

  useEffect(() => {
    if(authError) {
      setError(authError);
    }
  }, [authError])

  return (
    <div className={styles.login}> 
       <h1>Entrar</h1>
        <p>Faça login para utilizar</p>

        <form onSubmit={handleSubmit}>
        
          <label>
            <span>Email:</span>
            <input type="email" 
            required name="email" 
            placeholder="E-mail do usuário"
            value={email} 
            onChange={(e)=> setEmail(e.target.value)}/>
          </label>
          <label>
            <span>Senha:</span>
            <input type="password" 
            required name="password" 
            placeholder="Insira sua senha"
            value={password} 
            onChange={(e)=> setPassword(e.target.value)}/>
          </label>
          
         {!loading &&  <button className="btn" type="submit">Entrar</button>}
         {loading &&  <button className="btn" disabled><FaSpinner className="spinner" /></button>}
          {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Login