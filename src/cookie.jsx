import React from 'react'
import WelcomePage from './login/login.js'
import LoginPage from './profile.js'
import { CookiesProvider, useCookies } from 'react-cookie'

function App() {
  const [cookies, setCookie] = useCookies(['user'])

  function handleLogin(user) {
    setCookie('user', user, { path: '/' })
  }

  return (
    <CookiesProvider>
      <div>
        {cookies.user ? <profile user={cookies.user} /> : <Login onLogin={handleLogin} />}
      </div>
    </CookiesProvider>
  )
}

export default App
