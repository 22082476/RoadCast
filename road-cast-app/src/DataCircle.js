import './DataCircle.css';

export default function DataCircle({img, main, second}) {
  return (
    <div className="header-div">
      <div className='circle-div'>
        {img && <img src={img} alt="Weather Icon" style={{ width: '6rem' }} />}
        <h1 className='circle-header'>
          {main}
        </h1>
        <h2 className='second-text'>
          {second}
        </h2>
      </div>
    </div>
  );
}