import {useEffect, useState} from 'react';
import {useParams, Link, useLocation, useLoaderData} from 'react-router-dom';
import { getVans } from '../../service/api';

export function loader({ params }) {
	return getVans(params.id)
}

const VanDetail = () => {
  const location = useLocation();
	const vanDetail = useLoaderData();

  const search = location.state?.search || '';
  const type = location.state?.type || 'all';

  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>
      
        <div className="van-detail">
          <img src={vanDetail.imageUrl} alt="" />
          <i className={`van-type ${vanDetail.type} selected`}>{vanDetail.type}</i>
          <h2>{vanDetail.name}</h2>
          <p className="van-price">
            <span>${vanDetail.price}</span>/day
          </p>
          <p>{vanDetail.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
    </div>
  );
};

export default VanDetail;
