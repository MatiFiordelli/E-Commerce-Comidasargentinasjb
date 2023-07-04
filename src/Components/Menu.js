import React from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import FetchData from './FetchData'

export default class Menu extends React.Component {
	constructor(props) {
		super(props)
		this.setItemMenu = this.settItemMenu.bind(this)
	}
	
	componentDidMount() {
		window.onpopstate = () => this.setItemMenu(window.location.href) //on History browser
		this.setItemMenu(window.location.href) //on Mount
		
		let menuContainer = document.getElementById('menuContainer')
		let menu = document.getElementById("menu")
		let moveFlag = false
		let currentX = 0
		let initialPos
		//clientX: horizontal coordinate of the pointer when an event is triggered
		//currentX: current position of the menu
		//initialPos: the position where the 'drag' is started

		menu.addEventListener("mousedown", dragStart)
		window.addEventListener("mouseup", dragEnd)
		window.addEventListener("mousemove", drag)
		menu.addEventListener("touchstart", dragStart)
		menu.addEventListener("touchend", dragEnd)
		menu.addEventListener("touchmove", drag)
		
		function setInitialPos(e) {
			e.type === "touchstart" || e.type === "touchmove"
				?initialPos = e.touches[0].clientX - currentX
				:initialPos = e.clientX - currentX
			return initialPos
		}

		function dragStart(e) {
			setInitialPos(e)
			moveFlag = true
		} 

		function dragEnd(e) {
			initialPos = currentX
			moveFlag = false
		}

		function drag(e) {
			if (moveFlag) {
				let menuRect = menu.getBoundingClientRect() 
				let menuContainerRect = menuContainer.getBoundingClientRect() 
				e.preventDefault() //avoid the movement of gridResults while 'drag' the menu

			  //Drag the Menu
				e.type === "touchmove"
					?currentX = e.touches[0].clientX - initialPos
					:currentX = e.clientX - initialPos
				
				//Control of limits, right and left
				if (currentX > 0) {
					currentX = 0
					setInitialPos(e)
				}
				if (currentX < menuContainerRect.width - menuRect.width) {
					currentX = menuContainerRect.width - menuRect.width
					setInitialPos(e)
				}
				
				menu.style.transform = "translateX(" + currentX + "px)"
			}				
		}
	}
	
	componentDidUpdate() {
		this.setItemMenu(window.location.href) //ver si es necesario
	}
	
	//set the proper menu item in red, in correspondence to the current page
	async settItemMenu(e) {
		let element = await document.getElementsByClassName('item')
		let j
		for (let i in Object.entries(element)) {
			element[i].style.backgroundColor = 'black'
			
			if(element[i].href === window.location.href) j = i
		}

		//checks if this function was called from the component mount or from the click of the menu item
		if(j !== undefined) {
			e === window.location.href
			?element[j].style.backgroundColor = 'red'
			:e.target.style.backgroundColor = 'red'
		}
	}
	

	render() {
		return (
			<nav id = "menuContainer">
				<div id = "menu">
					<Link to='/breads' className = "item" onClick={(e)=>this.setItemMenu(e)}>Stuffed Breads</Link>
					<Link to='/canastitas' className = "item" onClick={(e)=>this.setItemMenu(e)}>Canastitas</Link>
					<Link to='/empanadas'className = "item" onClick={(e)=>this.setItemMenu(e)}>Empanadas</Link>
					<Link to='/pides' className = "item" onClick={(e)=>this.setItemMenu(e)}>Turkish Pides</Link>
				</div>

				<Routes>
					<Route path='/' element={<FetchData arg='type' type='breads'/>} />
					<Route path='/breads' element={<FetchData arg='type' type='breads'/>} />
					<Route path='/canastitas' element={<FetchData arg='type' type='canastitas'/>} />
					<Route path='/empanadas' element={<FetchData arg='type' type='empanadas'/>} />
					<Route path='/pides' element={<FetchData arg='type' type='pides'/>} />
					<Route path='/:id' element={<FetchData arg='search' type={(window.location.pathname).substring(1)}/>} />
				</Routes>
			</nav>
		)
	}
}