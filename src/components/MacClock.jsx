import React, { useState, useEffect } from 'react';

const MacClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    let intervalId;
    const updateTime = () => setTime(new Date());

    // Calculate delay until the next minute boundary starts
    const delay = 60000 - (Date.now() % 60000);

    const timeoutId = setTimeout(() => {
      updateTime();
      intervalId = setInterval(updateTime, 60000);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  // Format the date to match macOS style
  const formattedTime = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',   // "Tue"
    month: 'short',     // "Jun"
    day: 'numeric',     // "30"
    hour: 'numeric',    // "10"
    minute: '2-digit',  // "25"
    hour12: true        // "PM"
  })
    .format(time)
    .replace(/,/g, ''); // Removes the default commas added by Intl

  return (
    <div className='text-white'>
      {formattedTime}
    </div>
  );
};

// Optional: Styling to make it look native
const styles = {
  clockContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    color: '#000', // Use '#fff' if you have a dark menu bar
    cursor: 'default',
    userSelect: 'none', // Prevents highlighting the text
  }
};

export default MacClock;