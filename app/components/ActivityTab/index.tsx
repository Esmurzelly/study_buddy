import React from 'react'
import Link from 'next/link';
import { IActivity } from '@/app/types/types';
import DeleteButton from '../DeleteButton';


const ActivityTab = ({id, city, comments, date, dateList, description, image, likes, title, createdAt, updatedAt }: IActivity) => {
  return (
    <ul className='border border-red-700 p-3 rounded-md w-[90%]'>
      <h2>Activity tab!</h2>
      <li>title: {title}</li>
      <li>description: {description}</li>
      <li>city: {city}</li>
      <li>likes: {likes}</li>
      <li>date: {date}</li>

      {id && <DeleteButton id={id} />}
    </ul>
  )
}

export default ActivityTab