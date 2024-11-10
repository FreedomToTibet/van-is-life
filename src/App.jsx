import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Layout from './pages/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Vans, {loader as vansLoader} from './pages/Vans/Vans';
import VanDetail, {loader as vanDetailLoader} from './pages/Vans/VanDetail';
import HostLayout from './pages/Host/HostLayout';
import Dashboard from './pages/Host/Dashboard';
import Income from './pages/Host/Income';
import Reviews from './pages/Host/Reviews';
import HostVans, {loader as hostVansLoader} from './pages/Host/HostVans';
import HostVanDetail, {loader as hostVanDetailLoader} from './pages/HostVanDetail/HostVanDetail';
import HostVanInfo from './pages/HostVanDetail/HostVanInfo';
import HostVanPricing from './pages/HostVanDetail/HostVanPricing';
import HostVanPhotos from './pages/HostVanDetail/HostVanPhotos';
import Page404 from './pages/Page404';

import Login from './components/Login';

import Error from './components/Error';

import '../server';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route
        path="vans"
        element={<Vans />}
        loader={vansLoader}
        errorElement={<Error />}
      />
      <Route 
				path="vans/:id" 
				element={<VanDetail />} 
				loader={vanDetailLoader} 
			/>
      <Route path="host" element={<HostLayout />}>
        <Route
          index
          element={<Dashboard />}
          loader={async () => {
            return null;
          }}
        />
        <Route
          path="income"
          element={<Income />}
          loader={async () => {
            return null;
          }}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async () => {
						return null;
					}}
        />
        <Route
          path="vans"
          element={<HostVans />}
          loader={hostVansLoader}
        />
        <Route
          path="vans/:id"
          element={<HostVanDetail />}
          loader={hostVanDetailLoader}
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={async () => {
              return null;
            }}
          />
          <Route
            path="pricing"
            element={<HostVanPricing />}
            loader={async () => {
              return null;
            }}
          />
          <Route
            path="photos"
            element={<HostVanPhotos />}
            loader={async () => {
              return null;
            }}
          />
        </Route>
      </Route>
      <Route path="*" element={<Page404 />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
