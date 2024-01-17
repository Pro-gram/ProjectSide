import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import { add, format } from "date-fns";
import { STORE_CLOSING_TIME, STORE_OPENING_TIME, INTERVAL } from "@/constants/config";

function Calendar() {
  const [date, setDate] = useState({
    justDate: null,
    dateTime: null,
  });

  const getTimes = () => {
    if (!date.justDate) return;

    const { justDate } = date;

    const beginning = add(justDate, { hours: STORE_OPENING_TIME });
    const end = add(justDate, { hours: STORE_CLOSING_TIME });
    const interval = INTERVAL;
    const columnsPerRow = 5;

    const times = [];
    let currentRow = [];

    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      currentRow.push(i);

      if (currentRow.length === columnsPerRow) {
        times.push(...currentRow, 'BREAK_LINE');
        currentRow = [];
      }
    }

    if (currentRow.length > 0) {
      times.push(...currentRow);
    }

    return times;
  };

  const times = getTimes();

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {date.justDate ? (
        <div className="flex flex-wrap gap-4 intervalContainer">
          {times?.map((time, i) => (
            <div key={i} className={`rounded-sm intervalButton ${time === 'BREAK_LINE' ? 'breakLine' : ''}`}>
              {time !== 'BREAK_LINE' && (
                <button
                  type="button"
                  onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}
                  className="fixed-width-button"
                >
                  {format(time, "h:mm a")}
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <ReactCalendar
          minDate={new Date()}
          className="REACT-CALENDAR p-2"
          view="month"
          onClickDay={(selectedDate) => setDate((prev) => ({ ...prev, justDate: selectedDate }))}
        />
      )}
    </div>
  );
}

export default Calendar;
