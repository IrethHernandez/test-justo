import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from '../../firebase'
import Header from './../Header/Header'
import google from './../../assets/images/google.svg'
import styled from 'styled-components'
import key from '../../assets/images/key.svg'

const SignIn = (props) => {
	const [error, setError] = useState(false)

	const Container = styled.section`
		max-width: 1200px;
		padding: 0 20px;
	`
	const Paper = styled.div`
		max-width: 500px;
		margin: 40px auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px;
		box-shadow: none;
		border: 1px solid #e3e3e3;
		border-radius: 0;
		box-shadow: 10px 10px 10px #e3e3e3;
		@media (min-width: 768px) {
			padding: 20px 40px;
		}
	`
	const Avatar = styled.img`
		width: 70px;
		height: 70px;
		background: none;
	`
	
	const Submit = styled.button`
		margin: 40px 0;
		border: 0;
		border-radius: 0;
		background: #4285F4;
		padding: 0 10px 0 0;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
	`
	const ImgButton = styled.img`
		margin-right: 10px;
	`
	const TextLogin = styled.p`
		text-align: center;
		@media (min-width: 768px){
			text-align: left
		}
	`
	
	async function login() {
		setError(false);
		try {
			await firebase.login()
			.then(response => {
				localStorage.setItem('token', response.credential.accessToken);
				localStorage.setItem('user', JSON.stringify(response.user));
				props.history.push('/dashboard')
				  })
			.catch(error => console.error('Error:', error))
		
		} catch(error) {
			console.log(error.message)
		}
	}

	return (<>
		<Header/>
		<Container>
			<Paper>
				<Avatar src={key} alt="login"/>
				<form onSubmit={e => e.preventDefault() && false}>
					<Submit
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={login}>
						<ImgButton src={google} alt="Login Google"/>Iniciar sesión con Google
          			</Submit>
				</form>
				<TextLogin>
				Favor de iniciar sesión con una cuenta de Google para poder jugar.
       			</TextLogin>
			</Paper>
		</Container>
		</>
	)
}

export default withRouter(SignIn)