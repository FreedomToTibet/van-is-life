import { redirect } from "react-router-dom";

export const requireAuth = async () => {
	const isLoggedIn = localStorage.getItem('loggedin') === 'true';
    
    if (!isLoggedIn) {
        throw redirect("/login?message=You must log in first.");
    }
};