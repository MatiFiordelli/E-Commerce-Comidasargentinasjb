import React, { useEffect, useContext, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { RouteContext } from '../../Context'

export default function MenuBar(){
	const [setParam] = useContext(RouteContext)
	const menuContainer = useRef(null)
	const menuInner = useRef(null)

	useEffect(()=>{
		let moveFlag = false
		let currentX = 0
		let initialPos
		//clientX: horizontal coordinate of the pointer when an event is triggered
		//currentX: current position of the menu
		//initialPos: the position where the 'drag' is started

		const setInitialPos = (e) => {
			e.type === "touchstart" || e.type === "touchmove"
				?initialPos = e.touches[0].clientX - currentX
				:initialPos = e.clientX - currentX
			return initialPos
		}

		const dragStart = (e) => {
			setInitialPos(e)
			moveFlag = true
		} 

		const dragEnd = (e) => {
			initialPos = currentX
			moveFlag = false
		}

		const drag = (e) => {
			if (moveFlag) {
				let menuRect = menuInner.current.getBoundingClientRect() 
				let menuContainerRect = menuContainer.current.getBoundingClientRect() 
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
				
				menuInner.current.style.transform = "translateX(" + currentX + "px)"
			}				
		}

		menuInner.current.addEventListener("mousedown", dragStart)
		window.addEventListener("mouseup", dragEnd)
		window.addEventListener("mousemove", drag)
		menuInner.current.addEventListener("touchstart", dragStart)
		menuInner.current.addEventListener("touchend", dragEnd)
		menuInner.current.addEventListener("touchmove", drag)

		return () => {
			menuInner.current.removeEventListener("mousedown", dragStart)
			window.removeEventListener("mouseup", dragEnd)
			window.removeEventListener("mousemove", drag)
			menuInner.current.removeEventListener("touchstart", dragStart)
			menuInner.current.removeEventListener("touchend", dragEnd)
			menuInner.current.removeEventListener("touchmove", drag)
		}
	},[])
	
	const setItemMenuParam = (p) => {
		setParam(p)
	}
	
	return (
		<nav className = "menu-container" ref={menuContainer}>
			<div className = "menu-inner" ref={menuInner}> 
				<NavLink 
					to = '/breads' 
					className = {({isActive})=>!isActive?'menu-inner__item':'menu-inner__item menu-inner__item--active'} 
					onClick = {()=>setItemMenuParam('breads')}
				>
					Stuffed Breads
				</NavLink>
				<NavLink 
					to = '/canastitas' 
					className = {({isActive})=>!isActive?'menu-inner__item':'menu-inner__item menu-inner__item--active'}
					onClick = {()=>setItemMenuParam('canastitas')}
				>
					Canastitas
				</NavLink>
				<NavLink 
					to = '/empanadas' 
					className = {({isActive})=>!isActive?'menu-inner__item':'menu-inner__item menu-inner__item--active'}
					onClick = {()=>setItemMenuParam('empanadas')}
				>
					Empanadas
				</NavLink>
				<NavLink 
					to = '/pides' 
					className = {({isActive})=>!isActive?'menu-inner__item':'menu-inner__item menu-inner__item--active'}
					onClick = {()=>setItemMenuParam('pides')}
				>
					Turkish Pides
				</NavLink>
			</div>
		</nav>
	)
	
}