import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faGlassCheers,
  faUtensils,
  faMapMarkerAlt,
  faUsers,
  faCocktail,
  faInfinity,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";

function CategoryIcon({ icon }) {
  const category =
    icon == "Cafe"
      ? faCoffee
      : icon == "Bar"
      ? faCocktail
      : icon == "Restaurant"
      ? faUtensils
      : icon == "Brewery"
      ? faGlassCheers
      : icon == "patio"
      ? faUmbrellaBeach
      : faInfinity;
  return (
    <>
      {category ? (
        <div className='icon'>
          <Link
            href={{
              pathname: "/category",
              query: { type: icon },
            }}
          >
            <FontAwesomeIcon icon={category} title={icon} />
          </Link>
        </div>
      ) : null}
    </>
  );
}

function PathIcon({ icon }) {
  const path =
    icon == "Local"
      ? faMapMarkerAlt
      : icon == "Family"
      ? faUsers
      : icon == "Nightlife"
      ? faCocktail
      : null;

  return (
    <>
      {path ? (
        <div className='path-wrapper'>
          <FontAwesomeIcon
            icon={path}
            title={icon.charAt(0).toUpperCase() + icon.slice(1)}
          />{" "}
          <div>{icon}</div>
        </div>
      ) : null}
    </>
  );
}

export { PathIcon };
export { CategoryIcon };
