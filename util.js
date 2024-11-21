import { redirect } from "react-router-dom";

export const requireAuth = async (request) => {
	const pathname = new URL(request.url).pathname;
	const isLoggedIn = localStorage.getItem('loggedin') === 'true';
    
    if (!isLoggedIn) {
        throw redirect(`/login?message=You must log in first.&redirectTo=${pathname}`);
    }
};