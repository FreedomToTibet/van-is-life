export async function getVans(id) {
  const url = id ? `/api/vans/${id}` : '/api/vans';
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: 'Failed to fetch vans',
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.vans;
}

export async function getHostVans(id) {
  const url = id ? `/api/host/vans/${id}` : '/api/host/vans';
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: 'Failed to fetch vans',
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.vans;
}

export async function loginUser(creds) {
	const res = await fetch("/api/login",
			{ 
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(creds) 
			}
	);
	const data = await res.json();

	if (!res.ok || !data.user) {
    throw {
      message: data.message || "Failed to log in",
      statusText: res.statusText,
      status: res.status || 401,
    };
  }

	return data;
}
