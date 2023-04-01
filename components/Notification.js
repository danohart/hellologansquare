import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Notification(props) {
  const [close, setClose] = useState(false);

  function closeNotification() {
    setClose(true);
    setTimeout(function() {
      setClose(true);
    }, 8000);
  }

  return (
    <div className='notifications'>
      <div className={!close ? "notification open" : "notification"}>
        <div className='notification-close' onClick={() => setClose(true)}>
          <FontAwesomeIcon icon={faTimes} title={`Close notification`} />
        </div>
        <div className='notification-title'>{props.title}</div>
        <div className='notification-message'>{props.message}</div>
      </div>
    </div>
  );
}
