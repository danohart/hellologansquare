import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faGlassCheers,
  faUtensils,
  faCocktail,
  faInfinity,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [search, setSearch] = useState("");

  const icon = ["Cafe", "Bar", "Restaurant", "Brewery"];

  return (
    <>
      <div className='header'>
        <div className='header-logo'>
          <Link href='/'>
            <div className='header-logo-hello'>Hello</div>
            <div className='header-logo-neighborhood'>Logan Square</div>
          </Link>
        </div>
        {/* <input
        className='header-search'
        type='text'
        name='search'
        placeholder='Search'
        onChange={(e) => setSearch(e.target.value)}
      /> */}
        <div className='outer-menu'>
          <div className='menu'>
            <Link href='/patio'>
              <div className='button'>
                <FontAwesomeIcon icon={faUmbrellaBeach} />
                <span>{"Patios"}</span>
              </div>
            </Link>
            {icon.map((icon) => (
              <Link
                href={{
                  pathname: "/category/" + icon,
                }}
                key={icon}
              >
                <div className='button' id={icon} key={icon}>
                  <FontAwesomeIcon
                    icon={
                      icon == "Cafe"
                        ? faCoffee
                        : icon == "Bar"
                        ? faCocktail
                        : icon == "Restaurant"
                        ? faUtensils
                        : icon == "Brewery"
                        ? faGlassCheers
                        : faInfinity
                    }
                  />
                  <span>{icon === "Brewery" ? "Breweries" : icon + "s"}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
