'use client'
import Step1 from './../Steps/Step1'
import Step2 from './../Steps/Step2'
import Step3 from './../Steps/Step3'
import Step4 from './../Steps/Calendar'
import CurrentDates from './../ShowDate/CurrentDates';
import Intro from './intro'
import Ready from './Ready'

import { useState } from 'react';
import { useSelector } from 'react-redux'

const StepsComponents = ({open}) => {

    const [stepSprint , SetStepSprint] = useState(0)

    const { brands, status, error } = useSelector((state) => state.brand);


    if(!open) return null;

    return(
        <div className='flex sm:p-10 md:flex-nowrap flex-wrap bg-white items-start' id='steps'>
            <div className='w-full lg:w-1/3 px-4'>
                {stepSprint == 0 && <Intro step={SetStepSprint}/>}
                {stepSprint == 1 && <Step1 brand={brands} sprint={SetStepSprint}/>}
                {stepSprint == 2 && <Step2 sprint={SetStepSprint}/>}
                {stepSprint == 3 && <Step3 sprint={SetStepSprint}/>} 
                {stepSprint == 4 &&  <Step4 sprint={SetStepSprint}/>}
                {stepSprint == 5 && <Ready step={SetStepSprint}/>}
            </div>
            <CurrentDates/>
        </div>
    )
}

export default StepsComponents;