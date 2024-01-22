"use client"

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/redux/store';
import ActivityTab from '../components/ActivityTab';
import { useRouter } from 'next/navigation'
import Select, { components } from 'react-select';
import { setSelectedCity, clearSelectedCity, fetchActivities } from '@/app/redux/slices/activitySlice'
import { optionsCity } from '../utils/categoriesOption';

type Props = {
}


const ActivitiesPage = (props: Props) => {
    const { activity, error, loading, selectedCity } = useSelector((state: RootState) => state.activity);
    const [searchedActivities, setSearchedActivities] = useState(activity);
    const dispatch = useAppDispatch();
    const { ClearIndicator } = components;
    const router = useRouter();

    const getActivities = () => {
        dispatch(fetchActivities());
    }

    useEffect(() => {
        getActivities();
    }, [dispatch]);


    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>Error...</h1>
    }

    const handleChange = (selectedOption: any) => {
        if (selectedOption) {
            dispatch(setSelectedCity(selectedOption.label.toLowerCase()));

            const filteredByCity = searchedActivities.filter(activityElement => activityElement.city.toLowerCase() === selectedOption.label.toLowerCase());
            setSearchedActivities(filteredByCity);
        } else {
            dispatch(clearSelectedCity());
            setSearchedActivities(activity)
        }
    }

    // const filteredActivities = selectedCity
    //     ? activity.filter(activityElement => activityElement.city.toLowerCase() === selectedCity.toLowerCase())
    //     : activity;

    const onSearchAcvitvity = (findValue: any) => {
        let findedValue = activity.filter(activityElement =>
            activityElement.description?.toLowerCase().includes(findValue.toLowerCase()) ||
            activityElement.category?.toLowerCase().includes(findValue.toLowerCase()) ||
            activityElement.title?.toLowerCase().includes(findValue.toLowerCase())
        );
        setSearchedActivities(findedValue);
    }

    return (
        <div className='flex flex-col items-center justify-center gap-3 px-2'>
            <h1>Page Activities</h1>

            <input
                type="text"
                className='outline w-2/3'
                onChange={(e) => onSearchAcvitvity(e.target.value)}
            />

            <React.Fragment key={Math.random()}>
                <Select
                    defaultValue={selectedCity ? optionsCity.find(opt => opt.label.toLowerCase() === selectedCity) : null}
                    onChange={handleChange}
                    options={optionsCity}
                    components={{ ClearIndicator }}
                    isClearable
                    placeholder="City"
                    className='w-2/3'
                />
            </React.Fragment>

            <button onClick={() => router.back()}>Back</button>

            {searchedActivities.map(activityElem => (
                <ActivityTab key={activityElem.id} {...activityElem} />
            ))}

            {/* <button onClick={() => router.back()}>Back</button> */}
        </div>
    )
}

export default ActivitiesPage