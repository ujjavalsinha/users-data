import React, { useEffect, useState } from 'react';
import InputField from '../InputField/InputField'
import axios from 'axios'
import './UserTable.css'

const UserTable = () => {
    const [userData, setUserData] = useState([])
    const [error, setError] = useState('')
    const [searchInput, setSearchInput] = useState('')
   
    const fetchUserData = () => {
        axios.get('http://localhost:5000/users')
        .then(response => {
            setUserData(response.data)
        })
        .catch(err => {
            setError(err.response.data)
        })
    }

    useEffect(() => {
        fetchUserData()
    },[])
    

    const filterData = data => {
        for(let col in data){
            if(data[col].toString().match(searchInput)){
                return true
            }
        }
        return false
    }

    return (
        <div className='UserTable'>
            {userData.length  ?
            <>
            <InputField inputValue={searchInput} onInputChange={setSearchInput} placeholder='Search' />
            <div className='table-container'>
                <table cellSpacing="0" cellPadding="0">
                    <tr>
                        {Object.keys(userData[0]).map(columnName => {
                            return <th>{columnName.toUpperCase()}</th>
                        })}
                    </tr>
                    {userData.filter(row => filterData(row)).map(data => {
                            return (
                                <tr key={data.id}>
                                    {Object.keys(data).map((key) => {
                                        const tdClassName = key === 'address' ? 'address-cell cell' : 'cell'
                                        return <td className={tdClassName}>{data[key]}</td>
                                    })}
                                </tr>)
                        
                    })}
                </table>
            </div>
            </>
            :
            <p>Loading</p>
            }
        </div>
    )
}

export default UserTable
