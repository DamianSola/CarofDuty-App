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
import { useSelector, useDispatch } from 'react-redux'
import ProgressSteps from '../ui/ProgressSteps'

const StepsComponents = () => {
    const [stepSprint , SetStepSprint] = useState(0)
    const { brands } = useSelector((state) => state.brand);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBrandCars());
      }, [dispatch]);

    return(
        <div className='m-auto flex min-h-[calc(100vh-72px)] max-w-7xl flex-wrap items-start justify-between bg-body px-4 py-8 sm:px-8 md:py-16 lg:flex-nowrap lg:gap-10 lg:px-10'
            id='steps'>
            <div className='h-fit w-full items-center px-0 sm:px-4 lg:w-1/2'>
                {stepSprint > 0 && stepSprint < 5 ? <ProgressSteps current={stepSprint} /> : null}
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

export default StepsComponents
