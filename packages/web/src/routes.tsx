import { Box } from '@chakra-ui/react'
import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { RegisterUser, Detail } from './pages'

const Routes: React.FC = () => {
  return (
    <Router>
      <div className="wrapper">
        <header>
          <nav>
            <ul>
              <li>
                <a />
              </li>
            </ul>
          </nav>
        </header>
        <div className="content">
          <aside></aside>
          <main>
            <Switch>
              <Route exact path="/" component={RegisterUser} />
              <Route exact path="/transactions" component={Detail} />
            </Switch>
          </main>
          <aside></aside>
        </div>
        <footer>Footer</footer>
      </div>
    </Router>
  )
}

export default Routes
