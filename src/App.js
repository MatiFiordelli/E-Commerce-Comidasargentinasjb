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

//cuando se navega por el historico navegacion del browser, tener en cuenta las paginas root, 
//al ser busquedas debe actualizar el valor del input y mostrar los resultados