import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

function ChangePassword() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => { 

        e.preventDefault();

        if (!oldPassword.trim() || !newPassword.trim()) {

            alert("All fields are required");

            return;

        }

        try {

            setLoading(true);

            await api.post(

                "/user/changePassword",

                {
                    oldPassword,
                    newPassword,
                }

            );

            alert("Password Changed Successfully");

            setOldPassword("");

            setNewPassword("");
    navigate('/dashboard')


        }

        catch (err) {

            console.log(err);

            alert(

                err?.response?.data?.message ||

                "Something went wrong"

            );

        }

        finally {

            setLoading(false);

        }

    };



    return (

        <div className="min-h-screen bg-slate-950 flex justify-center items-center p-10">

            <form

                onSubmit={handleSubmit}

                className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-8"

            >

                <h1 className="text-3xl font-bold text-white mb-8">

                    Change Password

                </h1>



                {/* Old Password */}

                <div className="mb-6">

                    <label className="text-slate-300">

                        Old Password

                    </label>

                    <input

                        type="password"

                        value={oldPassword}

                        onChange={(e) =>

                            setOldPassword(e.target.value)

                        }

                        placeholder="Enter old password"

                        className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo-500"

                    />

                </div>



                {/* New Password */}

                <div className="mb-8">

                    <label className="text-slate-300">

                        New Password

                    </label>

                    <input

                        type="password"

                        value={newPassword}

                        onChange={(e) =>

                            setNewPassword(e.target.value)

                        }

                        placeholder="Enter new password"

                        className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo-500"

                    />

                </div>



                <button

                    type="submit"

                    disabled={loading}

                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition py-3 rounded-lg text-white font-semibold"

                >

                    {

                        loading

                            ?

                            "Updating..."

                            :

                            "Change Password"

                    }

                </button>

            </form>

        </div>

    );

}

export default ChangePassword;