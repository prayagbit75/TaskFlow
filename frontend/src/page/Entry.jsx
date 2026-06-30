import { Link } from "react-router";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Entry() {

  const { isAuthenticate } = useSelector(
    (state) => state.auth
);


     if (isAuthenticate) {
        return <Navigate to="/dashboard" replace />;
    }


  return (
       
                                                                       
           <section className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center">
      {/* Purple Glow */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl"></div>

      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-violet-700/30 blur-3xl"></div>

      {/* Small Dots */}
      <div className="absolute top-24 left-24 h-2 w-2 rounded-full bg-indigo-400"></div>
      <div className="absolute top-44 right-32 h-2 w-2 rounded-full bg-slate-400"></div>
      <div className="absolute bottom-44 left-60 h-2 w-2 rounded-full bg-violet-500"></div>

      {/* Main Content */}

      <div className="relative z-10 text-center px-6">

        {/* Logo */}

        <div className="mb-10">

          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-4xl font-bold shadow-xl shadow-indigo-500/40">

            ✓

          </div>

        </div>

        {/* Heading */}

        <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight">

          Welcome to

          <br />

          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">

            TaskFlow

          </span>

        </h1>

        {/* Subtitle */}

        <p className="mt-8 text-xl text-slate-400 max-w-2xl mx-auto">

          Organize your tasks, manage your projects and boost your
          productivity with a clean and modern workspace.

        </p>

        {/* Buttons */}

        <div className="mt-12 flex justify-center gap-5">

          <button className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold shadow-lg shadow-indigo-500/30">
              <Link to="/login" >
               Get Started
              </Link>

          </button>

          <button className="px-8 py-3 rounded-xl border border-slate-600 hover:border-indigo-500 hover:text-indigo-400 transition text-slate-300">

            Learn More

          </button>

        </div>

      </div>

      {/* Bottom Waves */}

      <div className="absolute bottom-0 left-0 w-full">

        <svg
          viewBox="0 0 1440 320"
          className="fill-indigo-600/10"
        >
          <path d="M0,256L60,245.3C120,235,240,213,360,213.3C480,213,600,235,720,245.3C840,256,960,256,1080,229.3C1200,203,1320,149,1380,122.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
        </svg>

      </div>

    </section> 

  );
}

export default Entry; 