import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/app/redux/store';
import ActivityTab from '../ActivityTab';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';


type Props = {}

const ActivityList = (props: Props) => {
  const { activity, error, loading } = useSelector((state: RootState) => state.activity);

  if(loading) {
    return <h1>Loading...</h1>
  }

  if(error) {
    return <h1>Error...</h1>
  }

  const filteredTabs = activity.slice(0, 3);

  return (
    <div className='flex flex-col items-center justify-center gap-3'>

      
      {filteredTabs.map(activityElem => (
       <ActivityTab key={uuidv4()} {...activityElem} />
      ))}

      <Link href={'/activities'}>Whole list</Link>
    </div>
  )
}

export default ActivityList