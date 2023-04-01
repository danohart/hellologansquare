import React from "react";

import PropTypes from "prop-types";

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <div key={i}>
        <p className='graphql-error'>
          <strong>Shoot!</strong>
          <br />
          {error.message.replace("GraphQL error: ", "")}
        </p>
      </div>
    ));
  }
  return (
    <div>
      <p className='graphql-error'>
        <strong>Shoot!</strong>
        <br />
        {error.message.replace("GraphQL error: ", "")}
      </p>
    </div>
  );
};

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;
