import {
	RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';


// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'


const router = createBrowserRouter(createRoutesFromElements(
	<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="vans" element={<Vans />} loader={vansLoader} errorElement={<Error />} />
					<Route path="vans/:id" element={<VanDetail />} />
					<Route path="host" element={<HostLayout />}>
						<Route index element={<Dashboard />} />
						<Route path="income" element={<Income />} />
						<Route path="reviews" element={<Reviews />} />
						<Route path="vans" element={<HostVans />} />
						<Route path="vans/:id" element={<HostVanDetail />}>
							<Route index element={<HostVanInfo />} />
							<Route path="pricing" element={<HostVanPricing />} />
							<Route path="photos" element={<HostVanPhotos />} />
						</Route>
					</Route>
					<Route path="*" element={<Page404/>} />
				</Route>
));

function App() {
  
  return (
    <RouterProvider router={router} />
  )
}

export default App;
