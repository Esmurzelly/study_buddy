import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivities, uploadActivity } from '@/app/redux/slices/activitySlice';
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

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();

    const selectedFile = e.target.files[0];
    if (selectedFile) {
        reader.readAsDataURL(selectedFile);
    }

    reader.onload = (readerEvent: any) => {
        if (selectedFile.type.includes("image")) {
          setImage(readerEvent.target.result);
        }
    };
};


  const handleFomSubmit = async (e: any) => {
    e.preventDefault();

    const activity: IActivity = {
        title,
        description,
        city,
        image,
        date,
        dateList,
        likes: 0,
        dislikes: 0,
        comments,
    };

    try {
      await dispatch(uploadActivity(activity))
      dispatch(fetchActivities());
    } catch (error) {
      console.log('error client in CreateActivity', error);
      dispatch(fetchActivities());
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
          <label htmlFor="image">Image: </label>
          <input 
            type="file"
            accept='image/*'
            id="image"
            name="image"
            src={image}
            onChange={handleImageChange}
            placeholder="Add image"
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
