import React from "react";
import EventSectionTitle from "./EventSectionTitle";

const EventDescription = (props) => {
  return (
    <div>
      <EventSectionTitle title="description" />
      {/* <p style={styles.paragraph} id="event-description">{props.description}</p> */}
      <div style={styles.paragraph} id="event-description" dangerouslySetInnerHTML={{__html: props.description}} />
    </div>
  );
}

const styles = {
  paragraph: {
    // margin: 50, 
    textAlign: "justify"
  }
}

export default EventDescription;