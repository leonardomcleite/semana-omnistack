import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'

export default function NewIncident() {

  const ongId = sessionStorage.getItem('ongId')

  const history = useHistory()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  async function handleCreateIncident() {
    const data = {
      title,
      description,
      value
    }
    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      }).then
      history.push('/profile')
    } catch (error) {
      alert(error)
    }
  }

  return(
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" className=""/>
          <h1>Cadastro</h1>
          <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso.</p>
          <Link className="link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para home
          </Link>
        </section>
        <form>
          <input 
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Titulo do Caso"/>
          <textarea 
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição"/>
          <input 
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Valor em reais"/>
          <button className="button" type="button" onClick={handleCreateIncident}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}