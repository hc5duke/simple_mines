import React from 'react';
import './SevenSegmentDisplay.css';

const SevenSegment = ({ digit }) => {
  const segments = {
    '0': ['a', 'b', 'c', 'd', 'e', 'f'],
    '1': ['b', 'c'],
    '2': ['a', 'b', 'g', 'e', 'd'],
    '3': ['a', 'b', 'g', 'c', 'd'],
    '4': ['f', 'g', 'b', 'c'],
    '5': ['a', 'f', 'g', 'c', 'd'],
    '6': ['a', 'f', 'g', 'e', 'c', 'd'],
    '7': ['a', 'b', 'c'],
    '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    '9': ['a', 'b', 'c', 'd', 'f', 'g'],
  };

  const activeSegments = segments[digit] || [];

  return (
    <div className="seven-segment">
      <div className={`segment a ${activeSegments.includes('a') ? 'on' : ''}`}></div>
      <div className={`segment b ${activeSegments.includes('b') ? 'on' : ''}`}></div>
      <div className={`segment c ${activeSegments.includes('c') ? 'on' : ''}`}></div>
      <div className={`segment d ${activeSegments.includes('d') ? 'on' : ''}`}></div>
      <div className={`segment e ${activeSegments.includes('e') ? 'on' : ''}`}></div>
      <div className={`segment f ${activeSegments.includes('f') ? 'on' : ''}`}></div>
      <div className={`segment g ${activeSegments.includes('g') ? 'on' : ''}`}></div>
    </div>
  );
};

const SevenSegmentDisplay = ({ minutes, seconds }) => {
  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  const minuteDigits = formatTime(minutes).split('');
  const secondDigits = formatTime(seconds).split('');

  return (
    <div className="seven-segment-display">
      <SevenSegment digit={minuteDigits[0]} />
      <SevenSegment digit={minuteDigits[1]} />
      <div className="separator">:</div>
      <SevenSegment digit={secondDigits[0]} />
      <SevenSegment digit={secondDigits[1]} />
    </div>
  );
};

export default SevenSegmentDisplay;
