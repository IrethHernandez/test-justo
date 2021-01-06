import React from 'react'
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  body{
	  font-family: 'Roboto'
  }
`

const App = (props) => {

	const ProtectedRoute = ({component: Component, ...rest}) => {
		return (
			<Route 
			{...rest} 
			render= {
				(props => {
					if (localStorage.getItem('user')) {
						return <Component {...props} />
					} else {
						return <Redirect to = {
							{
								pathname: "/login",
								state: {
									from: props.location
								}
							}
						}/>
					}
				})
			}/>
		);
	}
	
	return (<>
		<GlobalStyle />
			<Router>
				<Switch>
					<ProtectedRoute exact path="/" component={Dashboard} />
					<Route exact path="/login" component={Login} />
					<ProtectedRoute exact path="/dashboard" component={Dashboard} />
				</Switch>
			</Router>
	</>)
}

export default App;