import React from 'react'
import { deleteActivities, fetchActivities } from '@/app/redux/slices/activitySlice';
import { RootState, useAppDispatch } from '@/app/redux/store';

type Props = {
    id: string
}

const DeleteButon = ({ id }: Props) => {
  const dispatch = useAppDispatch();

  const handleDeleteActivity = () => {
    dispatch(deleteActivities(id));
    dispatch(fetchActivities());
  }

  return (
    <button className='p-2 bg-red-500 text-white rounded-md' onClick={() => handleDeleteActivity()}>deleteButon</button>
  )
}

export default DeleteButon