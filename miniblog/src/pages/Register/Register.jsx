
import { FaSpinner } from "react-icons/fa";
import { useAuthentication } from "../../hooks/useAuthentication";
import styles from './Register.module.css'

import { useState, useEffect } from "react"

const Register = () => { 
  const [displayName,setDisplayName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [error,setError] = useState("");

  const { createUser, error: authError, loading} = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      displayName,
      email,
      password
    }
    

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais!");
      return;
    }

    const res = await createUser(user)
    console.log(res)
  };

  useEffect(() => {
    if(authError) {
      setError(authError);
    }
  }, [authError])

  return (
    <div className={styles.register}>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuário e compartilhe suas histórias!</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input type="text" 
            required name="displayName" 
            placeholder="Nome do usuário"
            value={displayName}
            onChange={(e)=> setDisplayName(e.target.value)} />
          </label>
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
          <label>
            <span>Confirmação de senha:</span>
            <input type="password" 
            required name="confirmPassword" 
            placeholder="Insira a senha novamente" 
            value={confirmPassword}
            onChange={(e)=> setConfirmPassword(e.target.value)}/>
          </label>
         {!loading &&  <button className="btn" type="submit">Cadastrar</button>}
         {loading &&  <button className="btn" disabled><FaSpinner className="spinner" /></button>}
          {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Register