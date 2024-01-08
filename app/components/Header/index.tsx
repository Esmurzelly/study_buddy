import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchActivities } from '@/app/redux/slices/activitySlice';
import { RootState, useAppDispatch } from '@/app/redux/store';

type Props = {
    
}

const Header = (props: Props) => {

    return (
        <div>
            <h1>Icon</h1>
        </div>
    )
}

export default Header

