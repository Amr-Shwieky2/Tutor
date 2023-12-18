
import { useState } from 'react';
import './Schedule.css';

// Dummy data for the schedule
const scheduleData = {
  days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dates: ['26', '27', '28', '29', '30', '1', '2'],
  times: {
    'Sun': ['15:30', '17:30', '18:00', '18:30', '19:00', '19:30'],
    'Mon': [],
    'Tue': [],
    'Wed': ['19:00', '19:30', '20:00'],
    'Thu': ['15:30', '16:00', '16:30', '17:00', '17:30', '18:00'],
    'Fri': ['15:30', '16:00', '16:30', '17:00'],
    'Sat': ['15:30', '17:00', '17:30']
  }
};

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState(scheduleData.days[0]);

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h2>Schedule</h2>
        <div className="date-range">November 26 - Dec 2, 2021</div>
        <div className="timezone-selector">
          Jakarta GMT +7:00
        </div>
      </div>
      <div className="week-days">
        {scheduleData.days.map((day, index) => (
          <button
            key={day}
            className={`day-button ${day === selectedDay ? 'active' : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
            <span className="date">{scheduleData.dates[index]}</span>
          </button>
        ))}
      </div>
      <div className="time-slots">
        {scheduleData.times[selectedDay].map((time, index) => (
          <div key={index} className="time-slot">
            {time}
          </div>
        ))}
      </div>
      <button className="view-full-schedule">View full schedule</button>
    </div>
  );
};

export default Schedule;
