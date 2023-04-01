import react, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import Login from "./Login";
import Popup from "./Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedUser {
      id
      email
      name
    }
  }
`;

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    unauthenticateUser {
      success
    }
  }
`;

function Signin() {
  const [showPopup, setShowPopup] = useState(false);
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  if (data && data.authenticatedUser) {
    return (
      <>
        <Popup
          body={
            <button type='button' onClick={signout}>
              Sign Out &nbsp;
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          }
          show={showPopup}
          close={() => setShowPopup(!showPopup)}
        />
        <div className='signin'>
          <div
            className='signin-current'
            onClick={() => setShowPopup(!showPopup)}
          >
            <FontAwesomeIcon icon={faUser} />
            &nbsp;{data.authenticatedUser.name}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Popup
        title='Login'
        body={<Login close={() => setShowPopup(!showPopup)} error={error} />}
        show={showPopup}
        close={() => setShowPopup(!showPopup)}
      />
      <div className='signin' onClick={() => setShowPopup(!showPopup)}>
        Sign In
      </div>
    </>
  );
}

export { CURRENT_USER_QUERY, Signin };
