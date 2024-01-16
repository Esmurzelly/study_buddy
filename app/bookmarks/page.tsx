"use client"

import React, { useEffect } from 'react'
import ActivityTab from '../components/ActivityTab'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { fetchBookmarks } from '../redux/slices/bookmarkSlice'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs';
import Header from '../components/Header'

type Props = {}

const Bookmarks = (props: Props) => {
  const { bookmarks, error, loading } = useSelector((state: RootState) => state.bookmark);
  const { activity } = useSelector((state: RootState) => state.activity);
  
  const dispatch = useDispatch();
  const router = useRouter();
  const {user} = useUser();

  useEffect(() => {
    dispatch(fetchBookmarks())
  }, [dispatch]);

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Error...</h1>
  }

  const filteredBookmarks = bookmarks.filter(bookmarkItem => bookmarkItem.userId === user?.id)

  const bookmarksWithActivities = filteredBookmarks.map(bookmark => {
    const associatedActivity = activity.find(activityEl => activityEl.id === bookmark.activityId);
    return { ...bookmark, associatedActivity };
  })


  return (
    <div className='flex flex-col items-center justify-center gap-3'>
      {/* <Header /> */}
      <h1>Bookmarks</h1>

      <button onClick={() => router.back()}>Back</button>

      {bookmarksWithActivities.reverse().map(bookmarkEl => (
        <ActivityTab key={bookmarkEl.id} {...bookmarkEl.associatedActivity} />
        // <Link key={bookmarkEl.id} href={`activities/${bookmarkEl.activityId}`}>{bookmarkEl.id}</Link>
      ))}
    </div>
  )
}

export default Bookmarks