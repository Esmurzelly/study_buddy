'use client'

import React from 'react'

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchActivities } from '@/app/redux/slices/activitySlice';
import { RootState, useAppDispatch } from '@/app/redux/store';
import CreateActivity from '../CreateActivity';
import ActivityList from '../ActivityList';
import Link from 'next/link';

type Props = {}

const Main = (props: Props) => {
  const dispatch = useAppDispatch();
  const activities = useSelector((state: RootState) => state.activity.activity);

  const getActivities = () => {
    dispatch(fetchActivities());
  }

  useEffect(() => {
    getActivities();
  }, [dispatch])

  console.log('activities', activities);

  return (
    <div>
      <CreateActivity />
      <Link href={'/activities'}>All Activities</Link>
      <ActivityList />
    </div>
  )
}

export default Main