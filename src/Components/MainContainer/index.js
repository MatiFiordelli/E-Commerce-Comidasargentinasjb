import React, { useContext } from 'react'
import styles from './index.module.css'
import Spinner from '../Spinner'
import { ProductsContext } from '../../Context'
import GridResults from '../GridResults/index.js'

export default function MainContainer() {
    const [products] = useContext(ProductsContext)

    return (
        <>
            {(products === null || products === undefined)
                ? <Spinner />
                : Object.keys(products).length > 0
                    ?
                    <>
                        {/* {Object.values(products).map((e, i) => {
                            return (<p key={i}>{e.type} {e.name}</p>)
                        })} */}
                        <GridResults />
                    </>
                    :
                    <p className = {styles.emptyResults}>
                        Nothing was found, you could try a different search term
                    </p>
            }
        </>
    )
}