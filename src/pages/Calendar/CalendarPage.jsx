import { Outlet } from 'react-router';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import CalendarToolbar from 'components/Calendar/CalendarToolbar/CalendarToolbar';
import ChoosedMonth from 'components/Calendar/ChoosedMonth/ChoosedMonth';

const CalendarPage = () => {
  const params = useParams();
  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <div>
      <CalendarToolbar
        setCurrentDate={setCurrentDate}
        currentDate={currentDate}
      />
      {!params?.currentDay && (
        <ChoosedMonth
          setCurrentDate={setCurrentDate}
          currentDate={currentDate}
        />
      )}
      <Outlet />
    </div>
  );
};

export default CalendarPage;
