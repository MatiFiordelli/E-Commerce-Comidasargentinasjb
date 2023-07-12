import React, { useEffect } from 'react'

export default function ProductBigImage({ bigImageUrl, setBigImageUrl }) {

	useEffect(() => {
		showBigImage(bigImageUrl)
	}, [bigImageUrl])

	const showBigImage = (e) => {
		let el = document.querySelector('.big-image')
		let styleImg = ''

		if (e === 'off') {
			styleImg = `
				transform: rotateX(90deg);
				background-image: url('');
				`
		} else {
			styleImg = `
				transform: scale(100%);
				background-image: url('${bigImageUrl}');
				`
		}
		el.setAttribute('style', styleImg)
	}

	return (
		<section
			className="big-image"
			title="Click to close"
			onClick={() => setBigImageUrl('off')}
		>
			&times;
		</section>
	)
}