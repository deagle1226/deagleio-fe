import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import FastClick from 'fastclick'
import Container from './Container'
import Home from 'components/Home'

if (process.title === 'browser') {
    FastClick.attach(document.body)
    require('./styles.scss')
}

const App = React.createClass({
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Container}>
                    <IndexRoute component={Home} />
                    <Route path="home" component={Home} />
                </Route>
            </Router>
        )
    }
})

render(<App />, document.getElementById('anchor'));
