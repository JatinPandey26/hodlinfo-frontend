import React, { useContext } from 'react'
import './Table.scss'
import { TickerContext } from '../../Context/TickerContext'
const Table = () => {
    
    const tickers = useContext(TickerContext)
    return (
        <div className="tableWrapper">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Last Traded Price</th>
                        <th>Buy / Sell Price</th>
                        <th>Volume</th>
                        <th>Base Unit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tickers?.map((data, index) => {
                            return (
                                <tr key={index} className='backgroundGradient'>
                                    <td>{index + 1}</td>
                                    <td>{data.name}</td>
                                    <td>₹ {data.last}</td>
                                    <td>₹ {data.buy} / ₹{data.sell}</td>
                                    <td>{data.volume}</td>
                                    <td>{data.base_unit}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table