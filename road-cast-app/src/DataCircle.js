import './DataCircle.css';

export default function DataCircle({main, second}) {
  return (
    <div className="header-div">
      <div className='circle-div'>
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