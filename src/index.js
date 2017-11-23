import React from 'react'
import {render} from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import {syncHistoryWithStore} from 'react-router-redux'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import reducer from 'reducers'
import Layout from 'containers/layout'
import AdminLayout from 'containers/admin'
import {fetchPosts} from 'actions/posts'
import Posts from 'containers/posts'
import AdminPosts from 'containers/admin/posts'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

(function () {
  const history = syncHistoryWithStore(browserHistory, store)
  const promises = [store.dispatch(fetchPosts())]
  Promise.all(promises).then(() => {
    render(
      (<Provider store={store}>
        <BrowserRouter>
          <Router history={history}>
            <Route component={Layout}>
              <Route path='/' component={Posts}/>
            </Route>
            <Route path='/admin' component={AdminLayout}>
              <Route path='/admin/posts' component={AdminPosts}/>
            </Route>

          </Router>
        </BrowserRouter>
      </Provider>
      ), document.getElementById('root'))})
})()
