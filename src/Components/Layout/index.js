import React from 'react'
import SearchBar from '../SearchBar'
import MenuBar from '../MenuBar'

export default function Layout({children}){
    return(
        <>
            <SearchBar />
            {children}
            <MenuBar />
        </>
    )
}