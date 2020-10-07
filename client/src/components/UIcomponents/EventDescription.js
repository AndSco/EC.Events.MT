import React from "react";
import EventSectionTitle from "./EventSectionTitle";

const EventDescription = props => {
  return (
    <div>
      <EventSectionTitle title="description" />
      <div
        style={styles.paragraph}
        id="event-description"
        dangerouslySetInnerHTML={{ __html: props.description }}
      />
    </div>
  );
};

const styles = {
  paragraph: {
    textAlign: "justify"
  }
};

export default EventDescription;
