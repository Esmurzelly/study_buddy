import React from 'react'
import { deleteActivities, fetchActivities } from '@/app/redux/slices/activitySlice';
import { RootState, useAppDispatch } from '@/app/redux/store';
import { useRouter } from 'next/navigation';

type Props = {
    id: string
}

const DeleteButon = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDeleteActivity = async () => {
    await dispatch(deleteActivities(id));
    dispatch(fetchActivities());
    router.back();
  }

  return (
    <button className='p-2 bg-red-500 text-white rounded-md' onClick={() => handleDeleteActivity()}>deleteButon</button>
  )
}

export default DeleteButon