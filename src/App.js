import React from 'react'
import SearchBar from './Components/SearchBar'
import Menu from './Components/Menu'

export default class App extends React.Component {
	
	render() {
		return (
			<>
				<SearchBar/>
				<main id='gridContainer' />
				<Menu/>
			</>
		)
	}
}

