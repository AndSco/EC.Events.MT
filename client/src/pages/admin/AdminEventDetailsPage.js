import React from "react";
import Card from "../../components/UIcomponents/Card";
import RegistrationContext from "../../contexts/eventRegistration/RegistrationContext";
import Loader from "../../components/UIcomponents/Loader";
import SectionTitle from "../../components/UIcomponents/SectionTitle";
import SecondaryButton from "../../components/UIcomponents/SecondaryButton";
import ParticipantsTable from "../../components/ParticipantsTable";
import { Link } from "react-router-dom";
import {
  getParticipantsByStatus,
  sortParticipantsBySomeValue
} from "../../utils/functions";
import ParticipantsCount from "../../components/UIcomponents/ParticipantsCount";
import ActionSelector from "../../components/ActionSelector";
import CardContent from "../../components/UIcomponents/CardContent";
import { generateTableHeaders } from "../../assets/adminInputs";
import DownloadExcel from "../../components/DownloadExcel";

const AdminEventDetailsPage = props => {
  const context = React.useContext(RegistrationContext);
  const { currentEvent, isLoading, loadEventOnPage, deselectAll } = context;
  const eventId = props.match.params.eventId;
  const [participantCountActive, setParticipantCountActive] = React.useState(
    "total"
  );
  const [visibleParticipants, setVisibleParticipants] = React.useState(
    undefined
  );

  const responsiveTableHeaders = currentEvent
    ? generateTableHeaders(currentEvent)
    : undefined;

  const resortParticipants = receivedArray => {
    const copiedArray = [...receivedArray];
    setVisibleParticipants(copiedArray);
  };

  React.useEffect(() => {
    loadEventOnPage(eventId);
  }, [loadEventOnPage, eventId]);

  React.useEffect(() => {
    if (currentEvent && currentEvent.participantsRegistered) {
      setVisibleParticipants(
        sortParticipantsBySomeValue(
          "registrationStatus",
          currentEvent.participantsRegistered
        )
      );
    }
  }, [currentEvent]);

  const refreshEvent = () => {
    loadEventOnPage(eventId);
  };

  return isLoading || !currentEvent ? (
    <Loader />
  ) : (
    <div className="table-container">
      <Card>
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <SectionTitle
              title={currentEvent.title}
              callToAction="participants"
            />
            <div style={{ display: "flex" }}>
              <ParticipantsCount
                label="total"
                value={
                  currentEvent.participantsRegistered
                    ? currentEvent.participantsRegistered.length
                    : undefined
                }
                functionToPerform={() => {
                  deselectAll();
                  setParticipantCountActive("total");
                  setVisibleParticipants(
                    sortParticipantsBySomeValue(
                      "registrationStatus",
                      currentEvent.participantsRegistered
                    )
                  );
                }}
                isActive={participantCountActive === "total"}
              />
              <ParticipantsCount
                label="pending"
                value={
                  currentEvent.participantsRegistered
                    ? getParticipantsByStatus(currentEvent, "pending").length
                    : undefined
                }
                functionToPerform={() => {
                  deselectAll();
                  setParticipantCountActive("pending");
                  setVisibleParticipants(
                    getParticipantsByStatus(currentEvent, "pending")
                  );
                }}
                isActive={participantCountActive === "pending"}
              />
              <ParticipantsCount
                label="confirmed"
                value={
                  currentEvent.participantsRegistered
                    ? getParticipantsByStatus(currentEvent, "confirmed").length
                    : undefined
                }
                functionToPerform={() => {
                  deselectAll();
                  setParticipantCountActive("confirmed");
                  setVisibleParticipants(
                    getParticipantsByStatus(currentEvent, "confirmed")
                  );
                }}
                isActive={participantCountActive === "confirmed"}
              />
              <ParticipantsCount
                label="rejected"
                value={
                  currentEvent.participantsRegistered
                    ? getParticipantsByStatus(currentEvent, "rejected").length
                    : undefined
                }
                functionToPerform={() => {
                  deselectAll();
                  setParticipantCountActive("rejected");
                  setVisibleParticipants(
                    getParticipantsByStatus(currentEvent, "rejected")
                  );
                }}
                isActive={participantCountActive === "rejected"}
              />
              <ParticipantsCount
                label="spam"
                value={
                  currentEvent.participantsRegistered
                    ? getParticipantsByStatus(currentEvent, "spam").length
                    : undefined
                }
                functionToPerform={() => {
                  deselectAll();
                  setParticipantCountActive("spam");
                  setVisibleParticipants(
                    getParticipantsByStatus(currentEvent, "spam")
                  );
                }}
                isActive={participantCountActive === "spam"}
              />
            </div>
          </div>
          <div
            style={{
              margin: "30px 0 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <ActionSelector
              visibleParticipants={visibleParticipants}
              resortParticipants={resortParticipants}
            />
            <DownloadExcel dataSet={visibleParticipants} />
          </div>
          <ParticipantsTable
            tableHeaders={responsiveTableHeaders}
            tableEntries={visibleParticipants}
            refreshEvent={refreshEvent}
          />
          <div style={{ marginTop: 60 }}>
            <Link to="/">
              <SecondaryButton
                buttonName="Back to all events"
                isBackButton={true}
                functionToPerform={() => {}}
              />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEventDetailsPage;
