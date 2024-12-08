import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { IActivity } from '@/app/types/types';
import DeleteButton from '../DeleteButton';
import axios from 'axios';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/solid'
import Moment from 'react-moment';
import Image from 'next/image';

const ActivityTab = ({ id, city, comments, category, date, dateList, description, image, likes, dislikes, title, createdAt, updatedAt }: IActivity) => {
  // const capitalizeFirstLetter = (city: string) => {
  //   return city.charAt(0).toUpperCase() + city.slice(1);
  // }

  return (
    <div className='w-full border border-red-700 p-3'>
      <ul className='flex flex-col items-start gap-3 rounded-md'>
        {image && <img className='object-cover w-full h-[150px]' src={image} alt='image' />}

        <li>title click: {title}</li>
        <li>description: {description}</li>
        {category && <li>category: {category}</li>}
        <li>city: {city}</li>
        <li>
          <span className='flex flex-row items-center gap-2'>
            <div className='flex items-center gap-1'><HandThumbUpIcon className='w-5' />{likes}</div>
            <div className='flex items-center gap-1'><HandThumbDownIcon className='w-5' />{dislikes}</div>
          </span>
        </li>
        {/* <li>created at: <Moment format="YYYY/MM/DD">{createdAt}</Moment></li> */}
        
          <Link href={`/activities/${id}`} className='p-2 bg-green-600 rounded-md text-white'>Open activity</Link>
      </ul>
    </div>
  )
}

export default ActivityTab