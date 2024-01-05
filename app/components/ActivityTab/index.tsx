import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { IActivity } from '@/app/types/types';
import DeleteButton from '../DeleteButton';
import axios from 'axios';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/solid'


const ActivityTab = ({ id, city, comments, date, dateList, description, image, likes, dislikes, title, createdAt, updatedAt }: IActivity) => {
  // const [activity, setActivity] = useState<IActivity | null>(null);

  // const handleGetInfo = async (id: string | undefined) => {
  //   try {
  //     const {data} = await axios.get(`/api/activity/${id}`);
  //     console.log('response', data)
  //   } catch (error) {
  //     console.log('fetch the current activity error', error);
  //   }
  // };

  return (
    <div className='w-full border border-red-700 p-3'>
      <ul className='flex flex-col items-start gap-3 rounded-md'>
        <Link href={`/activities/${id}`} className='p-2 bg-green-600 rounded-md text-white'>Activity tab!</Link>
        <li>title click: {title}</li>
        <li>description: {description}</li>
        <li>city: {city}</li>
        <li>likes: {likes}</li>
        <li>dislikes: {dislikes}</li>
        <li>date: {date}</li>

      </ul>

      <div className='w-full flex flex-row items-center justify-between'>
        {id && <DeleteButton id={id} />}

        {/* <div className='flex items-center gap-3'>
          <HandThumbUpIcon onClick={() => console.log('like up')} className='w-8' />
          <HandThumbDownIcon onClick={() => console.log('like down')} className='w-8' />
        </div> */}
      </div>
    </div>


  )
}

export default ActivityTab