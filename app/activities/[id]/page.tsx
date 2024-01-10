"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { usePathname } from 'next/navigation'
import axios from 'axios'

import { IActivity } from '@/app/types/types'
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/solid'
import { useUser } from '@clerk/nextjs'
import DeleteButon from '@/app/components/DeleteButton'

type Props = {}

const ActivityDetails = (props: Props) => {
    const router = useRouter();
    const id = usePathname().split('/activities/')[1];
    const [activityDetail, setActivityDetail] = useState<IActivity>();
    const { user } = useUser();

    const handleGetInfo = async () => {
        try {
          const {data} = await axios.get(`/api/activity/${id}`);
          setActivityDetail(data)
          return data;
        } catch (error) {
          console.log('fetch the current activity error', error);
        }
      };

      useEffect(() => {
        handleGetInfo()
      }, []);

      const handleLike = async () => {
        try {
          const url = `/api/activity/${id}`;
          console.log('Like id put', id);
          const response = await axios.put(url, {data: { action: 'like', id: id }});
          console.log('Like response', response);
      
          handleGetInfo();
        } catch (error) {
          console.log('Like activity error', error);
        }
      };
      
      const handleDislike = async () => {
        try {
          const url = `/api/activity/${id}`;
          const response = await axios.put(url, { data: { action: 'dislike', id: id } });
          console.log('Dislike response', response.data);
          handleGetInfo();
        } catch (error) {
          console.log('Dislike activity error', error);
        }
      };

    if(!activityDetail) {
        return <h1>Loading...</h1>
    }
    
  return (
    <div>
        <h1>Activity Detail Page: {id}</h1>
        <p>title: {activityDetail?.title}</p>
        <p>description: {activityDetail?.description}</p>
        {activityDetail.category && <p>category: {activityDetail.category}</p>}
        {activityDetail.image && <img width={200} src={activityDetail?.image || undefined} alt="image" />}
        <p>likes: {activityDetail?.likes}</p>
        <p>dislikes: {activityDetail?.dislikes}</p>
        <p>date: {activityDetail?.date}</p>
        <p>userId: {activityDetail?.userId}</p>

        <div className='flex items-center gap-3'>
          <HandThumbUpIcon onClick={handleLike} className='w-8' />
          <HandThumbDownIcon onClick={handleDislike} className='w-8' />
        </div>
        {activityDetail.userId === user?.id && (<DeleteButon id={id} />)}
        <button onClick={() => router.back()}>Back</button>
    </div>
  )
}

export default ActivityDetails