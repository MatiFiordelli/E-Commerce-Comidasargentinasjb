import React from 'react'
import { arrayImages } from '../../Layout/ImportedImages'

export default class ProductBox extends React.Component {
	constructor(props) {
		super(props)
		this.state = { amount: this.props.amount }
		
		this.clickAddToCart = this.clickAdddToCart.bind(this)
		this.arrowsAmount = this.theArrowsAmount.bind(this)
		this.productState = this.producttState.bind(this)
		this.toggleEffectsAmount = this.togggleEffectsAmount.bind(this)
		this.sendDataBack = this.senddDataBack.bind(this)
	}
	
	//set the state and transfer the values back to the component GridResults
	async producttState(e) {
		await this.setState({ amount:e })
	}
	
	async senddDataBack() {
		let data = this.props.JsonResults
		await this.props.handler(data.id, this.state.amount, data.name, data.description, data.price, data.type)
	}
	
	//actions made when the 'Add to Cart' button is clicked
	async clickAdddToCart(e) {
		//when it is clicked on the 'Add to Cart' button, it sets the state amount in 1 unit
		await this.productState(1)
		await this.senddDataBack()
		
		this.toggleEffectsAmount(false)
	}
	
	//product amount handler
	async theArrowsAmount(e) {
		if (e === 'minus') {
			await this.productState(this.state.amount - 1)
			await this.senddDataBack()
			if (this.state.amount === 0) {
				this.toggleEffectsAmount(true)
			}
		}
		if (e === 'plus') {
			await this.productState(this.state.amount + 1)
			await this.senddDataBack()
		}
	}
	
	//it handles the visibility and effects of the cart button and amount elements
	togggleEffectsAmount(e) {
		let cap = document.getElementById('containerAmountProduct' +  this.props.JsonResults.id).style
		let bac = document.getElementById('btnAddCart' +  this.props.JsonResults.id).style

		if(e === false) {
			bac.transform = 'scale(0%)'
			bac.visibility = 'hidden'
			cap.visibility = 'visible'
			cap.transform = 'translateY(130px)'
		}else {
			bac.transform = 'scale(100%)'
			bac.visibility = 'visible'
			cap.visibility = 'hidden'
			cap.transform = 'translateY(200px)'
		}
	}
	
	componentDidMount() {
		if (this.state.amount !== 0) {
			this.toggleEffectsAmount(false)
		}else {
			this.toggleEffectsAmount(true)
		}
	}
	 

	render() {
		let data = this.props.JsonResults
		let imgUrl = '/' + data.image_url + '.jpg'
		const styleImg = {
			//"backgroundImage": `url(${imgUrl})`,
			"backgroundImage": `url(${arrayImages[data.id-1]})`,
			"backgroundRepeat": "no-repeat",
			"backgroundPosition": "center bottom",
			
			"backgroundSize": "cover"
			//I used individuals properties instead of CSS shorthand expansion, because
			//it ignores 'backgroundSize' when renders the image.
		}
		
		
		return (
			<section className="products">
				<div className="imageProduct" id={'imgProduct' + data.id} style={styleImg} 
					onClick={()=>this.props.transferBigImg(imgUrl)} title="Click to enlarge"/>
				<div className="titleProduct">{data.type + ': '+ data.name}</div>
				<div className="descriptionProduct">{data.description}</div>
				<div className="priceProduct">R${data.price}</div>
					
				{/* product amount elements */}
				<div className="containerAmountProduct" id={'containerAmountProduct' + data.id}>
					<div className="arrows" 
						onClick={()=>this.arrowsAmount('minus')}>&#10134;
					</div>
					
					<input className="inputAmountProduct" type="text" readOnly 
						id={'inputAmountProduct' + data.id} 
						value={this.state.amount} 
						onChange={ (e) => this.productState(e.target.value) }/>
					
					<div className="arrows"
						onClick={()=>this.arrowsAmount('plus')}>&#10133;
					</div>
				</div>
				<div className="btnAddCart" id={'btnAddCart' + data.id} 
					onClick={(e)=>this.clickAddToCart(e)}>Add to Cart
				</div>
			</section>
		
		)
	}
}

/* &#128686; trash symbol*/