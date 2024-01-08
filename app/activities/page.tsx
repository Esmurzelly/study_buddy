"use client"

import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/redux/store';
import ActivityTab from '../components/ActivityTab';
import { useRouter } from 'next/navigation'
import Select, { components } from 'react-select';
import { setSelectedCity, clearSelectedCity } from '@/app/redux/slices/activitySlice'

type Props = {
}

const options = [
    { value: 'moscow', label: 'Moscow' },
    { value: 'spb', label: 'SPB' },
    { value: 'magas', label: 'Magas' },
];

const ActivitiesPage = (props: Props) => {
    const { activity, error, loading, selectedCity } = useSelector((state: RootState) => state.activity);
    const [selectedOption, setSelectedOption] = useState(null);
    
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
            dispatch(setSelectedCity(selectedOption.value));
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

            <Select
                defaultValue={selectedCity ? options.find(opt => opt.value === selectedCity) : null}
                onChange={handleChange}
                options={options}
                components={{ ClearIndicator }}
                isClearable
                placeholder="City"
            />
            <button onClick={() => router.back()}>Back</button>

            {filteredActivities.map(activityElem => (
                <ActivityTab key={activityElem.id} {...activityElem} />
            ))}

            <button onClick={() => router.back()}>Back</button>
        </div>
    )
}

export default ActivitiesPage