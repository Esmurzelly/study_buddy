import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { IActivity } from '@/app/types/types';
import DeleteButton from '../DeleteButton';
import axios from 'axios';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/solid'


const ActivityTab = ({ id, city, comments, category, date, dateList, description, image, likes, dislikes, title, createdAt, updatedAt }: IActivity) => {

  function capitalizeFirstLetter(city: string) {
    return city.charAt(0).toUpperCase() + city.slice(1);
}

  return (
    <div className='w-full border border-red-700 p-3'>
      <ul className='flex flex-col items-start gap-3 rounded-md'>
        <Link href={`/activities/${id}`} className='p-2 bg-green-600 rounded-md text-white'>Activity tab!</Link>
        <li>title click: {title}</li>
        <li>description: {description}</li>
        {category && <li>category: {category}</li>}
        <li>city: {city}</li>
        {image && <img width={200} src={image} alt='image' />}
        <li>likes: {likes}</li>
        <li>dislikes: {dislikes}</li>
        <li>date: {date}</li>
      </ul>
    </div>


  )
}

export default ActivityTab