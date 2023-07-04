import React from 'react'

import Img0 from '../Assets/Images/PanItaliano/4cheesesbaconclassic.webp'
import Img1 from '../Assets/Images/PanItaliano/4cheesesbaconprovenzal.webp'
import Img2 from '../Assets/Images/PanItaliano/4cheesescalabresa.webp'
import Img3 from '../Assets/Images/PanItaliano/4cheesesgorgonzola.webp'
import Img4 from '../Assets/Images/PanItaliano/4cheesesparmesan.webp'
import Img5 from '../Assets/Images/Canastitas/canastitas3cheeses.webp'
import Img6 from '../Assets/Images/Canastitas/canastitas4cheeses.webp'
import Img7 from '../Assets/Images/Canastitas/canastitasarabes.webp'
import Img8 from '../Assets/Images/Canastitas/canastitasbaianas.webp'
import Img9 from '../Assets/Images/Canastitas/canastitasbolonesas.webp'
import Img10 from '../Assets/Images/Canastitas/canastitascalabresa.webp'
import Img11 from '../Assets/Images/Canastitas/canastitascaprese.webp'
import Img12 from '../Assets/Images/Canastitas/canastitascarnedulce.webp'
import Img13 from '../Assets/Images/Canastitas/canastitasfugazzetas.webp'
import Img14 from '../Assets/Images/Canastitas/canastitasgarlicbacon.webp'
import Img15 from '../Assets/Images/Canastitas/canastitasmineiras.webp'
import Img16 from '../Assets/Images/Canastitas/canastitasnapolitanas.webp'
import Img17 from '../Assets/Images/Canastitas/canastitasnortenas.webp'
import Img18 from '../Assets/Images/Canastitas/canastitasportuguesas.webp'
import Img19 from '../Assets/Images/Canastitas/canastitasprovenzal.webp'
import Img20 from '../Assets/Images/Canastitas/canastitasroquetas.webp'
import Img21 from '../Assets/Images/Canastitas/canastitastraditionalchicken.webp'
import Img22 from '../Assets/Images/Canastitas/canastitasverdeoschicken.webp'
import Img23 from '../Assets/Images/PanItaliano/chickenfricasse.webp'
import Img24 from '../Assets/Images/PanItaliano/chickenstroganoff.webp'
import Img25 from '../Assets/Images/Empanadas/empanadasarabes.webp'
import Img26 from '../Assets/Images/Empanadas/empanadasbaianas.webp'
import Img27 from '../Assets/Images/Empanadas/empanadascalabresa.webp'
import Img28 from '../Assets/Images/Empanadas/empanadascarnedulce.webp'
import Img29 from '../Assets/Images/PanItaliano/humita.webp'
import Img30 from '../Assets/Images/PanItaliano/italianbread.webp'
import Img31 from '../Assets/Images/PanItaliano/onionbread.webp'
import Img32 from '../Assets/Images/PidesTurcos/pide4cheeses.webp'
import Img33 from '../Assets/Images/PidesTurcos/pideandino.webp'
import Img34 from '../Assets/Images/PidesTurcos/pidebacon.webp'
import Img35 from '../Assets/Images/PidesTurcos/pidebaiano.webp'
import Img36 from '../Assets/Images/PidesTurcos/pidebombado.webp'
import Img37 from '../Assets/Images/PidesTurcos/pidecalamussa.webp'
import Img38 from '../Assets/Images/PidesTurcos/pidefugazza.webp'
import Img39 from '../Assets/Images/PidesTurcos/pidekibbeh.webp'
import Img40 from '../Assets/Images/PidesTurcos/pidemargheritawithsalmon.webp'
import Img41 from '../Assets/Images/PidesTurcos/pidenapolitano.webp'
import Img42 from '../Assets/Images/PidesTurcos/pideportugues.webp'
import Img43 from '../Assets/Images/PidesTurcos/pidepukacapa.webp'
import Img44 from '../Assets/Images/PidesTurcos/pidetraditional.webp'
import Img45 from '../Assets/Images/PidesTurcos/pidetraditionalchicken.webp'
import Img46 from '../Assets/Images/PanItaliano/shrimpsstroganoff.webp'
import Img47 from '../Assets/Images/PanItaliano/thaishrimpscream.webp'







const arrayImages =
[
	Img0, Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10, Img11, Img12, 
	Img13, Img14, Img15, Img16, Img17, Img18, Img19, Img20, Img21, Img22, Img23, Img24, 
	Img25, Img26, Img27, Img28, Img29, Img30, Img31, Img32, Img33, Img34, Img35, Img36, 
	Img37, Img38, Img39, Img40, Img41, Img42, Img43, Img44, Img45, Img46, Img47
]

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