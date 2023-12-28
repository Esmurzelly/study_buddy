import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/redux/store';
import ActivityTab from '../ActivityTab';
import { v4 as uuidv4 } from 'uuid';


type Props = {}

const ActivityList = (props: Props) => {
  const activities = useSelector((state: RootState) => state.activity.activity);

  return (
    <div className='flex flex-col items-center justify-center gap-3'>
      {activities.map(activity => (
       <ActivityTab key={uuidv4()} {...activity} />
      ))}
    </div>
  )
}

export default ActivityList