import { useEffect, useState } from 'react'
import './App.scss'
import { ThemeContext } from './Context/ThemeContext'
import Navbar from './components/Navbar/Navbar'
import Table from './components/Table/Table'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { TickerContext } from './Context/TickerContext'

function App() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme', 'dark');
    }
    else {
      if (theme === null) {
        setTheme(localStorage.getItem('theme'))
      }
      else {
        localStorage.setItem('theme', theme);
      }
    }
  }, [theme])


  const { isLoading, error, data } = useQuery({
    queryKey: ['tickersFromWazir'],
    queryFn: async () => {
      let { data } = await axios.get(import.meta.env.VITE_WAZIRX_API)
 
      data = data.slice(0, 10);
      await axios.post(import.meta.env.VITE_BASE_URL, { data })
      return data
    },
  })

  const { isLoading: isDataLoading, error: dataError, data: tickers } = useQuery({
    queryKey: ['ticketsFromBackend'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:8080/tickers/')
      return data
    },
    enabled: !isLoading,
  })

  return (
    <div className={theme === 'dark' ? 'App' : 'App light'}>

      <ThemeContext.Provider value={{ theme, setTheme }}>
        <TickerContext.Provider value={tickers}>
          <Navbar />
          {
            isDataLoading ? '...Loading...' : dataError ? 'something went wrong' : (
              <Table />
            )
          }
        </TickerContext.Provider>
      </ThemeContext.Provider>
    </div>
  )
}

export default App
