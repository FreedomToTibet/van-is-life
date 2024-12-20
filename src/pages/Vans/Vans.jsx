import { Suspense } from 'react';
import { Link, useSearchParams, useLoaderData, defer, Await } from 'react-router-dom';

import {getVans} from '../../service/api';

export function loader() {
  return defer({vans: getVans()});
}

const Vans = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const vansPromise = useLoaderData();

  const typeFilter = searchParams.get('type');

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (value == null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
      return newParams;
    });
  }

 
  return (
    <div className="van-list-container">
      <h1>Explore our vans options</h1>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={vansPromise.vans}>
          {(vans) => {
            const displayVans = typeFilter
              ? vans.filter((van) => van.type === typeFilter)
              : vans;

            const vanElements = displayVans.map((van) => (
              <div key={van.id} className="van-title">
                <Link
                  to={van.id}
                  state={{search: `?${searchParams.toString()}`, type: typeFilter}}
                >
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
            return (
              <>
                <div className="van-list-filter-buttons">
                  <button
                    onClick={() =>setSearchParams({type: 'simple'})}
                    className={`van-type simple ${
                      typeFilter === 'simple' ? 'selected' : ''
                    }`}
                  >
                    Simple
                  </button>
                  <button
                    onClick={() => setSearchParams({type: 'luxury'})}
                    className={`van-type luxury ${
                      typeFilter === 'luxury' ? 'selected' : ''
                    }`}
                  >
                    Luxury
                  </button>
                  <button
                    onClick={() => setSearchParams({type: 'rugged'})}
                    className={`van-type rugged ${
                      typeFilter === 'rugged' ? 'selected' : ''
                    }`}
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
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default Vans;
