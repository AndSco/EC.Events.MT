import React from "react";
import AddToCalendar from "react-add-to-calendar";
import RegistrationContext from "../contexts/eventRegistration/RegistrationContext";
import { addTimeToADate } from "../utils/functions";

const AddToCalendarButton = props => {
  const context = React.useContext(RegistrationContext);
  const { currentEvent } = context;
  const {
    title,
    description,
    venue: location,
    date,
    startingTime,
    endingTime
  } = currentEvent;
  const [eventForCalendar, setEventForCalendar] = React.useState(null);

  React.useEffect(() => {
    if (currentEvent) {
      setEventForCalendar({
        title,
        description,
        location,
        startTime: addTimeToADate(date, startingTime),
        endTime: addTimeToADate(date, endingTime)
      });
    }
  }, [currentEvent]);

  return (
    <div className="calendar-container">
      <AddToCalendar event={eventForCalendar} />
    </div>
  );
};

export default AddToCalendarButton;
