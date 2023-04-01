import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className='footer'>
      <div className='footer-inner'>
        <h4>About this Project</h4>
        <p>
          This project started out of{" "}
          <FontAwesomeIcon icon={faHeart} title='Hart Web Design' /> for local
          businesses by Daniel Hart Web Design, a&nbsp;
          <a href='https://danielhart.co' target='_blank'>
            web development and design company in Chicago
          </a>
          .
        </p>
        <p>
          If you would like to be involved in this project, send me an email -{" "}
          <a
            href='mailto:hello@danielhart.co?subject=Hello Logan Square'
            target='_blank'
          >
            hello@danielhart.co
          </a>
        </p>
        <div className='copyright'>
          Hello Logan Square &copy; {currentYear} | &nbsp;
          <Link href='/privacy-policy'>Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}
