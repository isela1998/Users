import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import UsersForm from './components/UsersForm';
import UsersList from './components/UsersList';

function App() {
  const [users, setUsers] = useState([])
  const [userSelected, setUserSelected] = useState(null);
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("New user")

  useEffect(() => {
    axios.get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data))
  }, [])

  const getUsers = () => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data));
  };

  const selectUser = (user) => {
    setUserSelected(user)
    setTitle("Edit user")
  };

  const visibilityForm = (show) => {
    setShowForm(show)
  }

  const clearSelection = () => {
    setUserSelected(null)
    setTitle("New user")
  }


  return (
    <div className="App">
      <div className='title-box'>
        <h1>USERS</h1>
        <button type='buttom' onClick={() => setShowForm(true)}>+ New user</button>
      </div>
      <UsersList users={users} selectUser={selectUser} getUsers={getUsers} />
      <UsersForm title={title} getUsers={getUsers} userSelected={userSelected} clearSelection={clearSelection} visibilityForm={visibilityForm} show={showForm} />
    </div>
  )
}

export default App
