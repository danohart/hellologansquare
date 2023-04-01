export default function Loading(props) {
  return (
    <div className='loading card-wrapper'>
      <div className='card'>
        <div className='title-wrapper'>
          <div className='loading-placeholder'></div>
        </div>
        <div className='inner'>
          <div className='loading-placeholder small'></div>
          <div className='additional-info'>
            <div className='loading-placeholder medium'></div>
          </div>
        </div>
      </div>
      {!props.singleCard ? (
        <>
          <div className='card'>
            <div className='title-wrapper'>
              <div className='loading-placeholder'></div>
            </div>
            <div className='inner'>
              <div className='loading-placeholder small'></div>
              <div className='additional-info'>
                <div className='loading-placeholder medium'></div>
              </div>
            </div>
          </div>
          <div className='card'>
            <div className='title-wrapper'>
              <div className='loading-placeholder'></div>
            </div>
            <div className='inner'>
              <div className='loading-placeholder small'></div>
              <div className='additional-info'>
                <div className='loading-placeholder medium'></div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
