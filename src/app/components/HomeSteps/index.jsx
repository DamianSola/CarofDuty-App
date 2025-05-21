'use client'
import Step1 from './../Steps/Step1'
import Step2 from './../Steps/Step2'
import Step3 from './../Steps/Step3'
import Step4 from './../Steps/Calendar'
import CurrentDates from './../ShowDate/CurrentDates';
import Intro from './intro'
import Ready from './Ready'
import { getAllBrandCars } from "../../../redux/Slices/brandSlice";
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from 'react-redux'

const StepsComponents = () => {

    const [stepSprint , SetStepSprint] = useState(0)

    const { brands, status, error } = useSelector((state) => state.brand);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllBrandCars());
      }, [dispatch]);


    return(
        <div className='flex sm:px-10 pt-6 md:pt-20 max-w-6xl m-auto items-top md:flex-nowrap md:space-x-10 justify-between flex-wrap bg-gray-100 h-fit' 
            id='steps'>
            <div className='w-full lg:w-1/2 px-2 md:px-10 h-fit items-center'>
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