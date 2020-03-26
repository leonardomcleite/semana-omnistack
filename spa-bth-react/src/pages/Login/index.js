import React, { useState } from 'react';
import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import api from  '../../services/api'

export default function Login(props) {

  const history = useHistory()
  const [id, setId] = useState('')

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const rsp = await api.post('login', {id: id})
      sessionStorage.setItem('ongId', id)
      sessionStorage.setItem('ongName', rsp.data.name)
      history.push('/profile')
    } catch (error) {
      alert(error)
    }
  }

  return(
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" className=""/>
        <form onSubmit={handleLogin}>
          <h1 className="">Faça seu Logon</h1>
          <input 
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="Seu ID"/>
          <button className="button" type="submit">Entrar</button>
          <Link className="link" to="/register">
            <FiLogIn size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" className=""/>
    </div>
  )
}