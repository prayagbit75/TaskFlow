import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from '../api/axios.js'
import { useDispatch, useSelector } from "react-redux";
import { addTitle } from "../features/todoSlice";
import { logout } from "../features/authSlice";
import { clearTitles } from "../features/todoSlice";
import { useNavigate } from "react-router-dom";

function Navbar() {

const dispatch = useDispatch();
const navigate = useNavigate();

const { isAuthenticate, user } = useSelector(
    (state) => state.auth
);
const [open, setOpen] = useState(false);

const [openTitle, setOpenTitle] = useState(false);

const [title, setTitle] = useState("");

const settitle = (e)=>{
     setTitle(e.target.value)
}

const handleDeleteAccount = async () => {

    const ok = window.confirm(
        "Are you sure you want to delete your account?\n\nThis action cannot be undone."
    );

    if (!ok) return;

    try {

        await api.delete("/user/deleteAccount");
        
    }

    catch (err) {

        console.log(err);

    }

    finally {

        dispatch(logout());

        dispatch(clearTitles());

        navigate("/");

    }

};

const handleLogout = async () => {

    try {

        await api.get("/user/logout");

      
    }

    catch (err) {

        console.log(err);

    }
    finally {

        dispatch(logout());

        dispatch(clearTitles());

        navigate("/");

    }

}


const handleAddTitle = async () => {

    if (!title.trim()) return;

    try {

        const response = await api.post(
            "/todo/createTitle",
            { title }
        );

        dispatch(addTitle(response.data.data));

        setTitle("");
        setOpenTitle(false);

    } catch (error) {

        console.log(error);

    }

}; 



  return (
<nav className="fixed top-0 left-0 w-full z-50 bg-slate-900 border-b border-slate-700 px-8 h-20 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-10">

        {/* Logo */}
        <div className="text-indigo-500 text-3xl font-bold">
          {/* <Link to="/" >TaskFlow</Link> */}
          TaskFlow
        </div>

        {/* Links */}
     <ul className="flex items-center gap-8 text-slate-300">

    {
        isAuthenticate ? (
            <li>
                <Link to="/dashboard">
                    Dashboard
                </Link>
            </li>
        ) : (
            <>
                <li>
                    <Link to="/signup">
                        Sign Up
                    </Link>
                </li>

                <li>
                    <Link to="/login">
                        Login
                    </Link>
                </li>
            </>
        )
    }

</ul>
      </div>

     {
    isAuthenticate && (

        <div className="flex items-center gap-5">

            {/* <input
                type="text"
                placeholder="Search..."
                className="bg-slate-800 text-white px-4 py-2 rounded-lg outline-none w-64"
            /> */}

                <button
                    onClick={() => setOpenTitle(true)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
                >
                    + Add Section
                </button>


     {
                openTitle && (

                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

                        <div className="bg-slate-900 border border-slate-700 rounded-2xl w-[420px] p-6">

                            <h2 className="text-2xl font-bold text-white mb-6">
                                Add New Section
                            </h2>

                           <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter Section Title..."
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-indigo-500"
                            />

                            <div className="flex justify-end gap-4 mt-6">

                                <button
                                    onClick={() => setOpenTitle(false)}
                                    className="px-5 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600"
                                >
                                    Cancel
                                </button>

                                <button
                                   onClick={handleAddTitle}
                                    className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                                >
                                    Add Title
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }



            <div className="relative">

                <div
                    onClick={() => setOpen(!open)}
                    className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center text-white font-bold cursor-pointer overflow-hidden"
                >

                    {
                        user?.profileImage?.url ?

                            <img
                                src={user.profileImage.url}
                                className="w-full h-full object-cover"
                            />

                            :

                            user?.name?.charAt(0).toUpperCase()

                    }

                </div>

                {
                    open && (

                        <div className="absolute right-0 mt-3 w-52 bg-slate-800 rounded-xl border border-slate-700 shadow-xl overflow-hidden text-white"  onClick={() => setOpen(!open)}>

                            <Link
                                to="/profile"
                                className="block px-4 py-3 hover:bg-slate-700"
                            >
                                Profile
                            </Link>

                            <Link
                                to="/edit-profile"
                                className="block px-4 py-3 hover:bg-slate-700"
                            >
                                Edit Profile
                            </Link>

                            <Link
                                to="/change-password"
                                className="block px-4 py-3 hover:bg-slate-700"
                            >
                                Change Password
                            </Link>

                            <button
                                onClick={handleLogout}

                                className="w-full text-left px-4 py-3 hover:bg-slate-700"
                            >
                                Logout
                            </button>

                            <button
                                   onClick={handleDeleteAccount}
                                className="w-full text-left px-4 py-3 text-red-500 hover:bg-slate-700"
                            >
                                Delete Account
                            </button>

                        </div>

                    )
                }

            </div>

        </div>

    )
}
    </nav>
  );
}

export default Navbar;