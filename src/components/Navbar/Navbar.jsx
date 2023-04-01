import React, { useContext, useEffect, useRef, useState } from 'react'
import './Navbar.scss'
import { AiFillCaretDown } from 'react-icons/ai'
import { FaTelegramPlane } from 'react-icons/fa'
import { ThemeContext } from '../../Context/ThemeContext'
import { useQueryClient } from '@tanstack/react-query'
const Navbar = () => {

    const { theme, setTheme } = useContext(ThemeContext);
    const [tick, setTick] = useState(60);
    let interval;
    const queryClient = useQueryClient()



    const updateTimer = () => {
        interval = setInterval(() => {

            setTick(tick => tick - 1);
            
            if (tick === 0) {
                setTick(60);
                queryClient.invalidateQueries(['tickersFromWazir'])
                queryClient.invalidateQueries(['ticketsFromBackend'])
            }

        }, 1000);
    }


    useEffect(() => {
        updateTimer()
        return () => {
            clearInterval(interval);
        }
    }, [tick])

    return (
        <nav className='navbar'>
            <div className="logo">
                <h1><span>HODLINFO</span>.com</h1>
                <p>Powered By <span>Finstreet</span></p>
            </div>
            <div className='btnWrapper'>
                <div className='choiceBtn backgroundGradient'>
                    <h3>INR</h3>
                    <AiFillCaretDown />
                </div>
                <div className='choiceBtn backgroundGradient'>
                    <h3>BTC</h3>
                    <AiFillCaretDown />
                </div>
            </div>

            <div className="widgetContainer">
                <div className="timer">
                    <span>
                        <p>{tick}</p>
                    </span>
                </div>
                <div className={theme === 'dark' ? 'telegram' : 'telegram light'}>
                    <FaTelegramPlane />
                    <span>Connect Telegram</span>
                </div>

                <div className={theme === 'dark' ? 'theme backgroundGradient' : 'theme light backgroundGradient'} onClick={
                    () => { setTheme(theme === 'light' ? 'dark' : 'light') }
                }>
                    <div className="ball"></div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar