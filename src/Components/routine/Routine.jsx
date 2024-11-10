import React, { useState, useEffect } from 'react';
import routineData from './routine.json'; // Adjust the path to your JSON file

const Routine = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedBatch, setSelectedBatch] = useState('25 B'); // Default batch

    // Update current time every minute to keep the schedule in real-time
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    // Get current day and time
    const currentDay = currentTime.toLocaleDateString('en-US', { weekday: 'long' });
    const currentDate = currentTime.toLocaleDateString('en-US'); // Current date
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const formattedTime = `${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`;

    // Find the schedule for the current day and filter by batch
    const todaySchedule = routineData.find(daySchedule => daySchedule.day === currentDay);
    const currentClass = todaySchedule
        ? todaySchedule.schedules.find(schedule =>
            schedule.batch === selectedBatch &&
            isTimeWithinRange(formattedTime, schedule.time)
        )
        : null;

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
        <div>
            <h2 className="text-xl font-bold mb-4">Current Class Routine</h2>
            <div className="mb-4">
                <label htmlFor="batch" className="mr-2">Select Batch:</label>
                <select
                    id="batch"
                    value={selectedBatch}
                    onChange={e => setSelectedBatch(e.target.value)}
                    className="border p-1"
                >
                    {/* Add more options as needed */}
                    <option value="25 B">25 B</option>
                    <option value="23 B">23 B</option>
                    <option value="20 B">20 B</option>
                </select>
            </div>

            {currentClass ? (
                <div className="p-4 border bg-green-100">
                    <h3 className="text-lg font-semibold">Current Class</h3>
                    <p><strong>Date:</strong> {todaySchedule.date}</p> {/* Display the date */}
                    <p><strong>Time:</strong> {currentClass.time}</p>
                    <p><strong>Batch:</strong> {currentClass.batch}</p>
                    <p><strong>Course:</strong> {currentClass.course}</p>
                    <p><strong>Room:</strong> {currentClass.room}</p>
                </div>
            ) : (
                <p className="text-red-500">No class is currently happening for the selected batch.</p>
            )}
        </div>
    );
};

export default Routine;
