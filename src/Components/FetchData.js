import React from 'react'
import ReactDOM from 'react-dom'
import GridResults from './GridResults'

export default class FetchData extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			search: '',
		}
		this.getData = this.gettData.bind(this)
	}
	
	componentDidMount(){
		this.getData(this.props.arg, this.props.type)
		document.getElementById('searchInput').value = ''
	}
	
	componentDidUpdate(prevProps) {
		//the next if, is to avoid an infinite loop updating
		if (prevProps.type !== this.props.type) {
			this.getData(this.props.arg, this.props.type)
			document.getElementById('searchInput').value = ''
		}
		window.scrollTo(0, 0)

	}
	
	gettData(arg, value) {
		document.getElementById('spinner').style.visibility = 'visible'
		if(value !== '') {
			localStorage.removeItem('searchInputLS')
			let theUrl = `http://comidasargentinasjb.atwebpages.com/connection.php?${arg}=${value}`
			let component
			fetch(theUrl)
			.then((response)=> response.json())
			.then((data)=>{
				this.setState({
					search: value, 
				})
				
				document.getElementById('spinner').style.visibility = 'hidden'
				
				//checks for the existence of some result
				Object.keys(data).length>0
					?component = <GridResults JsonResults = {data}/>
					:component = <div id="message">Nothing found, try a different term</div>
					
				let element = document.getElementById('gridContainer')
				ReactDOM.render(component, element)
			})
		}
	}	

	render() {
		return (
			<> 
				<div id='spinner'/>
			</>
		)
	}

}