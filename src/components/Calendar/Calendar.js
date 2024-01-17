import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import { add, format } from "date-fns";
import {
  STORE_CLOSING_TIME,
  STORE_OPENING_TIME,
  INTERVAL,
} from "@/constants/config";

const Calendar = ({ onClose }) => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const getTimes = () => {
    if (!selectedDateTime) return [];

    const beginning = add(selectedDateTime, { hours: STORE_OPENING_TIME });
    const end = add(selectedDateTime, { hours: STORE_CLOSING_TIME });
    const interval = INTERVAL;

    const times = [];
    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
    }

    return times;
  };

  const times = getTimes();

  const handleBackClick = () => {
    setSelectedDateTime(null);
  };

  const handleTimeSelection = (time) => {
    // Add your logic here to handle the selected date and time
    console.log("Date & Time Selected:", selectedDateTime, format(time, "h:mm a"));
  };

  const handleCloseClick = () => {
    setSelectedDateTime(null);
    onClose();
  };

  return (
    <div className="CalendarBox h-[100vh] w-[100vw] flex flex-col justify-center items-center relative">
      {selectedDateTime && (
        <>
          <button
            className="text-lg absolute top-4 right-2 text-gray-500 dark:text-gray-300"
            onClick={handleBackClick}
            style={{ zIndex: 1 }}
          >
            Back
          </button>
          <div className="grid grid-cols-5 gap-4">
            {times.map((time, index) => (
              <button
                key={index}
                type="button"
                className="text-sm rounded-sm p-2 w-20 h-14 bg-gray-200 dark:bg-gray-700"
                onClick={() => handleTimeSelection(time)}
              >
                {format(time, "h:mm a")}
              </button>
            ))}
          </div>
        </>
      )}

      {!selectedDateTime && (
        <ReactCalendar
          minDate={new Date()}
          className="REACT-CALENDAR p-2"
          view="month"
          onClickDay={(selectedDate) => setSelectedDateTime(selectedDate)}
        />
      )}

      {selectedDateTime && (
        <button
          className="text-lg absolute top-4 right-16 text-gray-500 dark:text-gray-300"
          onClick={handleCloseClick}
          style={{ zIndex: 1 }}
        >
          Close
        </button>
      )}
    </div>
  );
};

export default Calendar;
