import { Link, useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import { useState,useEffect } from "react";
import api from "../api/axios";

function SignUp() {    

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        profileImage: null,
    });

    const [preview, setPreview] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setFormData((prev) => ({
            ...prev,
            profileImage: file,
        }));

        setPreview(URL.createObjectURL(file));
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
          const data = new FormData();
          
          data.append("name", formData.name);
          data.append("username", formData.username);
          data.append("email", formData.email);
          data.append("password", formData.password);
          
          if (formData.profileImage) {
            data.append(
              "profileImage",
              formData.profileImage
            );
          }
          
          await api.post("/user/register", data);
          
          navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };


useEffect(() => {
          console.log(preview)
          return () => {
        console.log(preview)
        if (preview) {
            URL.revokeObjectURL(preview);
        }

    };

}, [preview])

    return (

        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

            <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"></div>

            <div className="absolute bottom-10 right-10 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-8">

                <h1 className="text-4xl font-bold text-center text-white">
                    Create Account
                </h1>

                <p className="text-center text-slate-400 mt-2">
                    Start organizing your tasks today.
                </p>

                <form
                    className="mt-8 space-y-5"
                    onSubmit={formSubmit}
                >

                    {/* Profile Image */}

                    <div className="relative w-fit mx-auto">

                        <div className="w-28 h-28 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center overflow-hidden">

                            {
                                preview ?

                                    <img
                                        src={preview}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />

                                    :

                                    <span className="text-5xl">
                                        👤
                                    </span>

                            }

                        </div>

                        <label
                            htmlFor="profileImage"
                            className="absolute -top-1 -right-1 bg-indigo-600 hover:bg-indigo-700 p-2 rounded-full cursor-pointer"
                        >
                            <Camera
                                size={18}
                                color="white"
                            />
                        </label>

                    </div>

                    <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImage}
                    />

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                    />

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 transition rounded-xl py-3 text-white font-semibold"
                    >
                        Create Account
                    </button>

                </form>

                <p className="text-center text-slate-400 mt-6">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-indigo-400 hover:text-indigo-300"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default SignUp;