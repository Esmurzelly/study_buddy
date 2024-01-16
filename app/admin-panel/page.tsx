"use client"

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActivities } from '../redux/slices/activitySlice'
import ActivityList from '../components/ActivityList'
import { RootState } from '../redux/store'
import ActivityTab from '../components/ActivityTab'
import DeleteButon from '../components/DeleteButton'

type Props = {}

const AdminPanel = (props: Props) => {
    const { activity, error, loading } = useSelector((state: RootState) => state.activity);
    const dispatch = useDispatch();

    if (loading) {
        return <h1>Loading...</h1>
    }

    // const getActivities = () => {
    //     dispatch(fetchActivities());
    // }

    // useEffect(() => {
    //     getActivities();
    // }, [dispatch])

    console.log('adm panel', activity)
    return (
        <div>
            <h1>AdminPanel</h1>

            <div className='flex flex-col items-center justify-center gap-3'>
                {activity.map((activityElem: any) => (
                    <div className='w-full flex'>
                        <ActivityTab key={activityElem.id} {...activityElem} />
                        <DeleteButon id={activityElem.id} />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default AdminPanel