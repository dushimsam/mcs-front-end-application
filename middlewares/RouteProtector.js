import { useEffect, useState } from "react";
import AuthService from "../services/auth/auth.service";
import jwt from "jwt-decode";
import NotFound from "../pages/404";
import Router from "next/router";

export default function RouteProtector({ children, only }) {
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        if (AuthService.isLoggedIn() && !AuthService.tokenExpired()) {
            setLoading(false)
        } else {
            setLoading(false)
            localStorage.setItem("mcs-prev_link", Router.asPath)
            await Router.push("/auth/login")
        }
    }, [])

    if (loading) return <div />
    if (!only.includes(jwt(AuthService.getDecToken()).User.category)) return <NotFound />

    return children
}