import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Rating = ({ rate }) => {
  const maxStars = 5;
  const fullStars = Math.floor(rate);
  const fractionalPart = rate - fullStars;

  const stars = [];

  for (let i = 0; i < maxStars; i++) {
    if (i < fullStars) {
      stars.push(<i key={i} className="text-yellow-500 fas fa-star"></i>);
    } else if (i === fullStars && fractionalPart >= 0.75) {
      stars.push(<i key={i} className="text-yellow-500 fas fa-star"></i>);
    } else if (i === fullStars && fractionalPart >= 0.5) {
      stars.push(<i key={i} className="text-yellow-500 fas fa-star-half"></i>);
    } else if (i === fullStars && fractionalPart >= 0.25) {
      stars.push(<i key={i} className="text-yellow-500 fas fa-star-half-alt"></i>);
    } else {
      stars.push(<i key={i} className="text-gray-300 far fa-star"></i>);
    }
  }

  return (
    <div className="flex items-center">
     
      <div className="flex">{stars}</div>
      <div className="ml-2 text-md text-gray-500">({rate})</div>
    </div>
  );
};



export default Rating;
