import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivities } from '@/app/redux/slices/activitySlice';
import { RootState, useAppDispatch } from '@/app/redux/store';
import { IActivity } from '@/app/types/types';


type Props = {};

const CreateActivity = (props: Props) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');

  const [dateList, setDateList] = useState([]);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);


  const handleFomSubmit = async (e: any) => {
    e.preventDefault();

    const activity: IActivity = {
        title,
        description,
        city,
        image,
        date,
        dateList,
        likes,
        comments,
    };

    try {
      const res = await axios.post('/api/activity', activity);

      if (res.data.error) console.log('res.data.error', res.data.error);

      if (!res.data.error) {
        console.log('well done');
        dispatch(fetchActivities());
      }
    } catch (error) {
      console.log('error client in CreateActivity', error);
    }
  };

  useEffect(() => {
    dispatch(fetchActivities);
  }, [dispatch])

  return (
    <div>
      <form onSubmit={handleFomSubmit} className='p-5'>
        <h1>Create Activity</h1>

        <div className='w-full flex justify-between gap-4'>
          <label htmlFor="title">title: </label>
          <input 
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter Title"
           />
        </div>

        <div className='w-full flex justify-between gap-4'>
          <label htmlFor="description">description: </label>
          <input 
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter description"
           />
        </div>

        <div className='w-full flex justify-between gap-4'>
          <label htmlFor="city">city: </label>
          <input 
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="Enter city"
           />
        </div>

        <div className='w-full flex justify-between gap-4'>
          <label htmlFor="date">date: </label>
          <input 
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            placeholder="Enter date"
           />
        </div>

        <button className='p-2 bg-slate-500 text-white rounded-md' type='submit'>send activity</button>
      </form>
    </div>
  );
};

export default CreateActivity;
