'use client'

import ShowTurns from "../../components/admin/Showturns";

const TurnsComponents = () => {
    return(
        <div className="p-10">
            <h1 className="flex-1 font-bold text-xl text-gray-700 md:mb-0 max-w-40 px-4">Turnos</h1>
            <ShowTurns/>
        </div>
    )
}

export default TurnsComponents;