import React, { useState, useEffect } from 'react';

// Import your JSON data here
import routineData from './routine.json'; 
const Routine = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedBatch, setSelectedBatch] = useState('25 B'); 
    const [currentClass, setCurrentClass] = useState(null);

    // Update current time every minute to keep the schedule in real-time
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); 

        return () => clearInterval(interval);
    }, []);

    // Get current day and time in the proper format
    const currentDay = currentTime.toLocaleDateString('en-US', { weekday: 'long' });
    const currentDate = currentTime.toLocaleDateString();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const formattedTime = `${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`;

    const todaySchedule = routineData.find(daySchedule => daySchedule.day === currentDay);

    useEffect(() => {
        if (todaySchedule) {
            const currentClassDetails = todaySchedule.schedules.find(schedule => {
                return (
                    schedule.batch === selectedBatch &&
                    isTimeWithinRange(formattedTime, schedule.time)
                );
            });
            setCurrentClass(currentClassDetails); // Update the currentClass state
        }
    }, [selectedBatch, formattedTime, todaySchedule]);

    // Helper function to check if current time is within a schedule's time range
    function isTimeWithinRange(current, scheduleTime) {
        const [start, end] = scheduleTime.split(' - ').map(t => convertTo24HourFormat(t));
        return current >= start && current <= end;
    }

    // Convert 12-hour format time (with AM/PM) to 24-hour format
    function convertTo24HourFormat(time) {
        const [hour, minutePart] = time.split(':');
        const [minutes, modifier] = minutePart.split(' ');
        let hourIn24 = parseInt(hour, 10);
        if (modifier === 'PM' && hourIn24 !== 12) hourIn24 += 12;
        if (modifier === 'AM' && hourIn24 === 12) hourIn24 = 0;
        return `${hourIn24}:${minutes}`;
    }

    return (
        <div className="px-10 flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold mb-4">Current Class Routine</h2>

            {/* Display the current time and current day with the current date */}
            <div className="text-lg font-semibold mb-4">
                <div className='flex gap-4'>
                    <p> {currentDay}</p>
                    <p>{currentDate}</p>

                </div>

                <p> Time: {currentTime.toLocaleTimeString()}</p>
            </div>

            {/* Batch selection */}
            <div className="mb-4">
                <label htmlFor="batch" className="mr-2">Select Batch:</label>
                <select
                    id="batch"
                    value={selectedBatch}
                    onChange={e => setSelectedBatch(e.target.value)}
                    className="border p-1"
                >
                    <option value="25 B">25 B</option>
                    <option value="23 B">23 B</option>
                </select>
            </div>

            {/* Display current class details */}
            <div>
                <h3 className="text-lg font-semibold">Batch: {selectedBatch}</h3>
                {currentClass ? (
                    <div className="p-4 border bg-green-100">
                        <p><strong>Time:</strong> {currentClass.time}</p>
                        <p><strong>Course:</strong> {currentClass.course}</p>
                        <p><strong>Room:</strong> {currentClass.room}</p>
                    </div>
                ) : (
                    <p className="text-red-500">No class is currently happening for this batch.</p>
                )}
            </div>
        </div>
    );
};

export default Routine;
