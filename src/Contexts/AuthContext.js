import React, { useContext, useState, useEffect } from 'react'
import {stateContext} from './stateContext'
import {auth} from './firebase'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({children}) {

  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const userContext = useContext(stateContext)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
       
      setCurrentUser(user)
      setCurrentUser(user.email)
      setLoading(false)
    })
    return unsubscribe
  },[])

  const logOutUser = () => {
    setCurrentUser()
  }

  const value = {
    currentUser,
    signup,
    login,
    logOutUser
  }

  return (
    <AuthContext.Provider value={value}>
    {children}
    </AuthContext.Provider>
  )
}