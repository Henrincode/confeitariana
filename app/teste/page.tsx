'use client'

import { useEffect, useState } from "react"

export default function teste() {
    const [limite, setLimite] = useState('0')
    const [mes, setMes] = useState('1')
    const [dia, setDia] = useState('0')
    const [ms, setMs] = useState('')


    useEffect(()=> {
        let newLimit = limite
        if(mes === '1') {
            newLimit = '10'
        } else if(mes === '2') {
            newLimit = '20'
        }
        setLimite(newLimit)
        setMs(newLimit)
        if(Number(dia) > Number(newLimit)) setDia(newLimit)

    },[mes])
    return(
        <div className="box">
            <input onChange={e => setMes(e.target.value)} value={mes} className="bg-amber-200" type="number" min={1} max={12} />
            <input onChange={e => setDia(e.target.value)} value={dia} className="bg-white" type="number" min={0} max={limite} />
            <div onClick={() => setLimite('3')}>mes {mes}</div>
            <div onClick={() => setLimite('3')}>dia {dia}</div>
            <div>limite {limite}</div>
            <div>msg {ms}</div>
        </div>
    )
}