import {useState} from 'react';
import {Link, useSearchParams, useLoaderData} from 'react-router-dom';

import {getVans} from '../../service/api';

export function loader() {
  return getVans();
}

const Vans = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const vans = useLoaderData();

  const typeFilter = searchParams.get('type');

  const displayVans = typeFilter ? vans.filter((van) => van.type === typeFilter) : vans;

  const vanElements = displayVans.map((van) => (
    <div key={van.id} className="van-title">
      <Link to={van.id} state={{search: `?${searchParams.toString()}`, type: typeFilter}}>
        <img src={van.imageUrl} alt="van" />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  if (error)
    return <h1>Something went wrong: {error.message}. Please try again later.</h1>;

  return (
    <div className="van-list-container">
      <h1>Explore our vans options</h1>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => setSearchParams({type: 'simple'})}
          className={`van-type simple 
						${typeFilter === 'simple' ? 'selected' : ''}`}
        >
          Simple
        </button>
        <button
          onClick={() => setSearchParams({type: 'luxury'})}
          className={`van-type luxury 
						${typeFilter === 'luxury' ? 'selected' : ''}`}
        >
          Luxury
        </button>
        <button
          onClick={() => setSearchParams({type: 'rugged'})}
          className={`van-type rugged 
						${typeFilter === 'rugged' ? 'selected' : ''}`}
        >
          Rugged
        </button>
        {typeFilter ? (
          <button
            onClick={() => handleFilterChange('type', null)}
            className="van-type clear-filters"
          >
            Reset
          </button>
        ) : null}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
};

export default Vans;
