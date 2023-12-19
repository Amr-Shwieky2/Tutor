import React from 'react'
import { useParams } from 'react-router';

function Dashboard() {
    const { tutorId } = useParams();
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard