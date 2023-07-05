import React from 'react'
import Layout from './Components/Layout'

export default class App extends React.Component {
	
	render() {
		return (
			<>
				<Layout>
					<main id='gridContainer' />
				</Layout>
			</>
		)
	}
}