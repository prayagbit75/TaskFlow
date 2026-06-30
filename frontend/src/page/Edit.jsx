import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/axios.js"

function Edit() {

    const { user } = useSelector(
        (state) => state.auth
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [profileImage, setProfileImage] =
        useState(null);

    const [preview, setPreview] =
        useState("");



    useEffect(() => {

        if (user) {

            setName(user.name);

            setEmail(user.email);

            setPreview(
                user.profileImage?.url
            );

        }

    }, [user]);



    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setProfileImage(file);

        setPreview(
            URL.createObjectURL(file)
        );

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // Update Name & Email

            await api.patch(

                "/user/updateUser",

                {
                    name,
                    email,
                }

            );

            // Update Profile Image

            if (profileImage) {

                const formData = new FormData();

                formData.append(
                    "profileImage",
                    profileImage
                );

                await api.patch(

                    "/user/updateProfileImage",

                    formData,

                    {

                        headers: {

                            "Content-Type":
                                "multipart/form-data",

                        },

                    }

                );

            }

            alert("Profile Updated Successfully");

        }

        catch (err) {

            console.log(err);

            alert("Something went wrong");

        }

    };



    return (

        <div className="min-h-screen bg-slate-950 flex justify-center items-center p-10">

            <form

                onSubmit={handleSubmit}

                className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl p-8"

            >

                <h1 className="text-3xl font-bold text-white mb-8 text-center" >

                    Edit Profile

                </h1>



                {/* Profile Image */}

                <div className="flex flex-col items-center mb-8">

                   <div className="relative">

    {
        preview ? (

                    <img
                        src={preview}
                        alt="profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
                            />

                        ) : (

                            <div className="w-32 h-32 rounded-full border-4 border-indigo-500 bg-slate-800 flex items-center justify-center text-5xl font-bold text-white">

                                {name?.charAt(0).toUpperCase()}

                            </div>

                        )
                    }

                    <label
                        htmlFor="image"
                        className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 flex justify-center items-center text-white text-xl cursor-pointer"
                    >
                        +
                    </label>

                </div>

                    <input

                        id="image"

                        type="file"

                        accept="image/*"

                        hidden

                        onChange={handleImage}

                    />

                </div>



                {/* Name */}

                <div className="mb-6">

                    <label className="text-slate-300">

                        Name

                    </label>

                    <input

                        value={name}

                        onChange={(e) =>

                            setName(e.target.value)

                        }

                        className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none"

                    />

                </div>



                {/* Email */}

                <div className="mb-8">

                    <label className="text-slate-300">

                        Email

                    </label>

                    <input

                        value={email}

                        onChange={(e) =>

                            setEmail(e.target.value)

                        }

                        className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none"

                    />

                </div>



                <button

                    type="submit"

                    className="w-full bg-indigo-600 hover:bg-indigo-700 transition py-3 rounded-lg text-white font-semibold"

                >

                    Update Profile

                </button>

            </form>

        </div>

    );

}

export default Edit;