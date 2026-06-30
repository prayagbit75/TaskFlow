import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import api from "../api/axios";
import { login, logout } from "../features/authSlice";

function AuthLoader({ children }) {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const checkAuth = async () => {

            try {

                const response = await api.get(
                    "/user/CurrentUser"
                );

                dispatch(
                    login(response.data.data)
                );

            } catch (err) {

                dispatch(logout());

            } finally {

                setLoading(false);

            }

        };

        checkAuth();

    }, []);

    if (loading) {

        return (

            <div className="min-h-screen flex justify-center items-center bg-slate-950 text-white">

                Loading...

            </div>

        );

    }

    return children;
}

export default AuthLoader;