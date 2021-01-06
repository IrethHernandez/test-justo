import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import firebase from '../../firebase'
import styled from 'styled-components'
import Header from './../Header/Header'
import Board from './../Board/Board'


const Dashboard = (props) => {
	const History = useHistory();
	const [userData, setUserData] = useState(null);
	
	const Main = styled.main`
		min-height: calc(100vh - 100px);
	`
	const ContainerCenter = styled.section`
		display: block;
	`
	const ContainerUserData = styled.section`
		padding: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	`

	const UserName = styled.h4`
		text-transform: uppercase;
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
	`

	const Button = styled.button`
		padding: 10px 15px;
		background: #134834;
		color: #fdc502;
		border: none;
		border-radius:0;
		text-transform: uppercase;
		display: block;
		margin: 20px;
		cursor: pointer;
	`
	
	useEffect(() => {
		if(localStorage.getItem('user')) {
			setUserData(JSON.parse(localStorage.getItem('user')))
		}else{
			History.push('/login')
		}
	},[History])

	async function logout() {
		await firebase.logout()
		.then(response =>{
			localStorage.removeItem('token')
			localStorage.removeItem('user')
			History.push('/login')
		});
	}

	return (
		<>
		<Header/>
		<Main>
			<ContainerUserData>
				<div>
					<UserName>
						¡Hola, {userData && userData.displayName}!
					</UserName>
					<p>
						¡Encuentra todos los pares para ganar!
					</p>
				</div>
				<Button type="submit" onClick={logout}>Cerrar sesión</Button>
			</ContainerUserData>
			<ContainerCenter>
				<Board/>
			</ContainerCenter>
		</Main>
		</>
	)
}

export default withRouter(Dashboard)