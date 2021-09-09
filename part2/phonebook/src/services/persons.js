import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)  
  return request.then(response => response.data)
}

const create = (newContact) => {
  const request = axios.post(baseUrl, newContact)
  return request.then(response => response.data)
}

const deleteContact = (id) => {
  const request = axios.delete(`http://localhost:3001/persons/${id}`)
  return request
}

const replaceContact = (duplicateContact) => {
  const request = axios.put(`http://localhost:3001/persons/${duplicateContact.id}`, duplicateContact)
  return request.then(response => response.data)
}

const contactService = {
  getAll,
  create,
  deleteContact,
  replaceContact
}

export default contactService