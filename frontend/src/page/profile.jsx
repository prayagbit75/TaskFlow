import { Camera } from "lucide-react";
import { useSelector } from "react-redux";

function Profile() {


  const {user} = useSelector((state)=>state.auth);

    


  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">

      {/* Background Glow */}
      <div className="absolute top-28 left-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Card */}
        <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-xl p-10">

          {/* Heading */}
          <h1 className="text-4xl font-bold text-white text-center">
            My Profile
          </h1>

          <p className="text-center text-slate-400 mt-2">
            Manage your personal information.
          </p>

          {/* Profile */}
          <div className="mt-10 flex flex-col items-center">

            <div className="relative">
              { user?.profileImage?.url ? <img
                src={  user?.profileImage?.url }
                alt=""
                className="w-36 h-36 rounded-full object-cover border-4 border-indigo-500"
              /> :    <div
    onClick={() => setOpen(!open)}
    className="w-36 h-36 rounded-full bg-slate-600 flex items-center justify-center text-white font-bold cursor-pointer overflow-hidden"
>
    <span className="text-7xl">
        {user?.name?.charAt(0).toUpperCase()}
    </span>
</div>
              }

              {/* <label
                htmlFor="profile"
                className="absolute bottom-1 right-1 bg-indigo-600 hover:bg-indigo-700 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition"
              >
                <Camera size={18} color="white" />
              </label>

              <input
                id="profile"
                type="file"
                className="hidden"
              /> */}

            </div>

          </div>

          {/* Information */}

          <div className="grid md:grid-cols-2 gap-8 mt-12">

            {/* Name */}
            <div>
              <label className="text-slate-400 text-sm">
                Full Name
              </label>

              <div className="mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white">
               { user.name}
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="text-slate-400 text-sm">
                Username
              </label>

              <div className="mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white">
                {user.username}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-slate-400 text-sm">
                Email
              </label>

              <div className="mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white">
                 {user.email}
              </div>
            </div>

            {/* Created */}
            <div>
              <label className="text-slate-400 text-sm">
                Joined On
              </label>

              <div className="mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white">
               {user.createdAt.split("T")[0]}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;