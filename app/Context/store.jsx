'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

const GlobalContext = createContext({
	curPage: 0,
	setCurPage: () => '',
	numOfPages: 0,
	setNumOfPages: () => ''
})


export const GlobalContextProvider = ({ children }) => {
	const [curPage, setCurPage] = useState('')
	const [numOfPages, setNumOfPages] = useState('')

	return (
		<GlobalContext.Provider value={{curPage, setCurPage, numOfPages, setNumOfPages}}>
			{children}
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => useContext(GlobalContext)