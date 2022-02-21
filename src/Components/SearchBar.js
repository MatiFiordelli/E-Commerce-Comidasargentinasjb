import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import GridResults from './GridResults'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
	const [search, setSearch] = useState('')
	let navigate = useNavigate()
	
	function getData(arg, value) {
		if(value !== '') {
			window.scrollTo(0, 0)
			localStorage.setItem('searchInputLS', value)
			
			let theUrl = `http://comidasargentinasjb.atwebpages.com/connection.php?${arg}=${value}`
			let component
			fetch(theUrl)
			.then((response)=> response.json())
			.then((data)=>{
				setSearch(value)
				
				Object.keys(data).length>0
					?component = <GridResults JsonResults = {data}/>
					:component = <div id="message">Nothing found, try a different term</div>
				
				let element = document.getElementById('gridContainer')
				ReactDOM.render(component, element)
			})
		}
		//Every time a search is made, it navigates to the web app root
		navigate("/")
		
		//set every menu item in black
		let element = document.getElementsByClassName('item')
		for (let i in Object.entries(element)) {
			element[i].style.backgroundColor = 'black'
		}
	}
	
	useEffect(()=>{
		let ls = localStorage.getItem('searchInputLS')
		
		//checks if a search has been made
		if(ls !== null) {
			document.getElementById('searchInput').value = ls
			
			//checks if the page has benn refreshed
			if(search === '') {
				setSearch(ls)
				getData('search', ls)
			}
		}
	})

	return (
		<div id="searchContainer">
			<input type="text" id="searchInput" placeholder="" autoFocus 
				value={search}
				onChange={ (e) => setSearch(e.target.value) }
				onKeyUp={
					(e)=> {
						if(e.key === "Enter"){getData('search', search)}
					}
				}					
			/>
			<button id="searchButton" onClick={()=> getData('search', search)}>&#x1F50E;&#xFE0E;</button>
		</div>
	)
}