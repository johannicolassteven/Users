import {useEffect, useState, useRef, useMemo} from 'react'
import './App.css'
import { type User } from './assets/types'
import { UsersList } from './assets/components/UsersList'


function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const originalUsers = useRef<User[]>([])
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  } 
  
  const handleDelete = ( email:string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  useEffect(()=>{
    fetch('https://randomuser.me/api?results=100')
    .then(res => res.json())
    .then(res =>{
      setUsers(res.results)
      originalUsers.current = res.results
    })
    .catch(err => {
      console.log(err)
    })
  },[])

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === "string" 
  ? users.filter((user => {
    return user.location.country.toLocaleLowerCase().includes(filterCountry.toLocaleLowerCase()) 
  })): users
  },[users, filterCountry]) 



  const sortedUsers = useMemo(() => {
    return sortByCountry ?
     filteredUsers.toSorted((a,b) => {
      return a.location.country.localeCompare(b.location.country)
  })
  : filteredUsers
  },[filteredUsers, sortByCountry])

  
  return (
    <>
      <h1>Users Table</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear Filas
        </button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? "No ordenar por pais" : "Ordenar por pais"}
        </button>
        <button onClick={handleReset}>
          Resetear estado
        </button>
        <input placeholder='filtra por pais' onChange={(e) =>
          setFilterCountry(e.target.value)
        }></input>

      </header>
      <main>
      <UsersList deleteUser={handleDelete} showColors={showColors} users={sortedUsers}/>
      </main>
    </>
  )
}

export default App
