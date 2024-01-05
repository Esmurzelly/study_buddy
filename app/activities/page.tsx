"use client"

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/redux/store';
import ActivityTab from '../components/ActivityTab';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

type Props = {}

const ActivitiesPage = (props: Props) => {
    const router = useRouter();

    const { activity, error, loading } = useSelector((state: RootState) => state.activity);

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>Error...</h1>
    }

    return (
        <div className='flex flex-col items-center justify-center gap-3'>
            <h1>Page Activities</h1>
            {activity.map(activityElem => (
                <ActivityTab key={uuidv4()} {...activityElem} />
            ))}

            <button onClick={() => router.back()}>Back</button>

        </div>
    )
}

export default ActivitiesPage