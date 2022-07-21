import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const UsersList = ({ users, selectUser, getUsers }) => {
    const deleteUser = (id, name, last_name) => {
        axios
            .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
            .then(() => {
                alert(`User "${name} ${last_name}" Successfully deleted!`)
                getUsers()
            });
    };

    return (
        <div className='users-box'>
            {users.map((user) => {
                return (
                    <div key={user.id} className="user-box">
                        <div>
                            <ul>
                                <li>
                                    <span className='span-name'>{user.first_name} {user.last_name} </span><hr />
                                    <small className='small-title'>EMAIL</small><br />
                                    <span className='span-email'>{user.email}</span><br />
                                    <small className='small-title'>BIRTHDAY</small><br />
                                    <FontAwesomeIcon icon={faGift} />
                                    <span className='span-birthday'> {user.birthday}</span><hr />
                                </li>
                            </ul>
                        </div>
                        <div className='buttons-box'>
                            <button className='button-trash' onClick={() => deleteUser(user.id, user.first_name, user.last_name)}><FontAwesomeIcon icon={faTrash} /></button>
                            <button className='button-edit' onClick={() => selectUser(user)}><FontAwesomeIcon icon={faEdit} /></button>
                        </div>
                    </div>
                )
            })
            }
        </div>
    )
}

export default UsersList