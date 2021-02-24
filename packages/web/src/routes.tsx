import { Box } from '@chakra-ui/react'
import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { RegisterUser } from './pages'

const Routes: React.FC = () => {
  return (
    <Router>
      <div className="wrapper">
        <header>
          <nav>
            <ul>
              <li>
                <a href="#">Item 1</a>
              </li>
              <li>
                <a href="#">Item 2</a>
              </li>
              <li>
                <a href="#">Item 3</a>
              </li>
            </ul>
          </nav>
        </header>
        <div className="content">
          <aside>Sidebar 1</aside>
          <main>
            <Switch>
              <Route exact path="/" component={RegisterUser} />
            </Switch>
          </main>
          <aside>Sidebar 2</aside>
        </div>
        <footer>Footer</footer>
      </div>
    </Router>
  )
}

export default Routes
