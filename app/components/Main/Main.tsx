'use client'

import React from 'react'
import { UserButton, useUser } from "@clerk/nextjs";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchActivities } from '@/app/redux/slices/activitySlice';
import { RootState, useAppDispatch } from '@/app/redux/store';
import CreateActivity from '../CreateActivity';
import ActivityTab from '../ActivityTab';
import ActivityList from '../ActivityList';

type Props = {}

const Main = (props: Props) => {
  const dispatch = useAppDispatch();
  const activities = useSelector((state: RootState) => state.activity.activity)

  const getActivities = () => {
    dispatch(fetchActivities());
  }

  useEffect(() => {
    getActivities();
  }, [dispatch])

  console.log('activities', activities);

  return (
    <div>
      Main Content 
      <UserButton afterSignOutUrl="/"/>
      <hr />

      <CreateActivity />
      <ActivityList  />
    </div>
  )
}

export default Main