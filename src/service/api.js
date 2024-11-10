// export async function getVans() {
//   const response = await fetch('/api/vans');

//   if (!response.ok) {
//     throw new Error('Failed to fetch vans');
//   }
//   const data = await response.json();
//   return data.vans;
// }

export async function getVans(id) {
	const url = id ? `/api/vans/${id}` : "/api/vans"
	const res = await fetch(url)
	if (!res.ok) {
			throw {
					message: "Failed to fetch vans",
					statusText: res.statusText,
					status: res.status
			}
	}
	const data = await res.json()
	return data.vans
}

export async function getHostVans(id) {
	const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
	const res = await fetch(url)
	if (!res.ok) {
			throw {
					message: "Failed to fetch vans",
					statusText: res.statusText,
					status: res.status
			}
	}
	const data = await res.json()
	return data.vans
}
