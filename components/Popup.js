import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

export default function Popup(props) {
  const showHide = props.show
    ? { visibility: "visible", opacity: "1" }
    : { visibility: "hidden", opacity: "0" };

  return (
    <>
      <div
        className='popup-overlay'
        style={showHide}
        onClick={props.close}
      ></div>
      <div className='popup' style={showHide}>
        <button className='popup-close' onClick={props.close}>
          <FontAwesomeIcon icon={faWindowClose} />
        </button>
        <div className='popup-header'>
          <h2>{props.title}</h2>
        </div>
        <div className='popup-body'>{props.body}</div>
      </div>
    </>
  );
}
