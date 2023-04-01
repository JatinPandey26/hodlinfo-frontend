import React, { useContext } from 'react'
import './Table.scss'
import { TickerContext } from '../../Context/TickerContext'
const Table = () => {
    const data = {
        base_unit: "btc",
        quote_unit: "inr",
        low: "2402095.0",
        high: "2489000.0",
        last: "2410001.0",
        volume: "9.56071",
        sell: "2410001.0",
        buy: "2407001.0",
        at: 1680338008,
        name: "BTC/INR"
    }

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
                                    <td>{data.symbol}</td>
                                    <td>₹ {data.lastPrice}</td>
                                    <td>₹ {data.bidPrice} / ₹{data.askPrice}</td>
                                    <td>{data.volume}</td>
                                    <td>{data.baseAsset}</td>
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