import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RouteContext } from '../../Context/index.js'

export default function SearchBar() {
	const [searchTerms, setSearchTerms] = useState('')
	const [param, setParam] = useContext(RouteContext)
	let navigate = useNavigate()

	const processPhrase = (phrase) => {
		const p = phrase.trim()
		return p.replaceAll(' ', '+')
	}

	const getData = () => {
		if (searchTerms !== '') {
			window.scrollTo(0, 0)
			navigate(`/${processPhrase(searchTerms)}`)
			setParam(processPhrase(searchTerms))
		}
	}

	useEffect(()=>{
		const term = window.location.pathname.substring(1)
		setSearchTerms(term)
	},[])

	return (
		<header className="search-bar-container">
			<input
				type="text"
				className="search-bar-container__input"
				placeholder="What product are you looking for?"
				autoFocus
				value={searchTerms}
				onChange={(e) => setSearchTerms(e.target.value)}
				onKeyUp={
					(e) => {
						if (e.key === "Enter") { getData() }
					}
				}
			/>
			<button
				className="search-bar-container__button"
				onClick={() => getData()}
			>
				&#x1F50E;&#xFE0E;
			</button>
		</header>
	)
}