"use client"

import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/redux/store';
import ActivityTab from '../components/ActivityTab';
import { useRouter } from 'next/navigation'
import Select, { components } from 'react-select';
import { setSelectedCity, clearSelectedCity } from '@/app/redux/slices/activitySlice'
import { options } from '../utils/citiesList';

type Props = {
}


const ActivitiesPage = (props: Props) => {
    const { activity, error, loading, selectedCity } = useSelector((state: RootState) => state.activity);
    // const [selectedOptionState, setSelectedOptionState] = useState(null);
    
    const dispatch = useAppDispatch();
    const { ClearIndicator } = components;
    const router = useRouter();


    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>Error...</h1>
    }

    const handleChange = (selectedOption: any) => {
        if (selectedOption) {
            dispatch(setSelectedCity(selectedOption.label.toLowerCase()));
        } else {
            dispatch(clearSelectedCity());
        }
    }

    const filteredActivities = selectedCity
        ? activity.filter(activityElement => activityElement.city.toLowerCase() === selectedCity.toLowerCase())
        : activity;

    return (
        <div className='flex flex-col items-center justify-center gap-3'>
            <h1>Page Activities</h1>

            <React.Fragment key={Math.random()}>
                <Select
                    defaultValue={selectedCity ? options.find(opt => opt.label.toLowerCase() === selectedCity) : null}
                    onChange={handleChange}
                    options={options}
                    components={{ ClearIndicator }}
                    isClearable
                    placeholder="City"
                    className='w-2/3'
                />
            </React.Fragment>
            
            <button onClick={() => router.back()}>Back</button>

            {filteredActivities.map(activityElem => (
                <ActivityTab key={activityElem.id} {...activityElem} />
            ))}

            {/* <button onClick={() => router.back()}>Back</button> */}
        </div>
    )
}

export default ActivitiesPage