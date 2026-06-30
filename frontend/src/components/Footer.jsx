

function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 text-slate-400">

      <div className="mx-auto px-8 py-10">

        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Logo */}
          <div>
            <h1 className="text-2xl font-bold text-indigo-500">
              TaskFlow
            </h1>

            <p className="text-sm mt-2 text-slate-500">
              Organize your work and boost productivity.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm">


            <a
              href="#"
              className="hover:text-white transition"
            >
              About
            </a>

            <a
              href="#"
              className="hover:text-white transition"
            >
              Contact
            </a>

            <a
              href="#"
              className="hover:text-white transition"
            >
              Privacy
            </a>

          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">

          <p>
            © {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>

          <div className="flex gap-5 mt-4 md:mt-0">

            <a
              href="#"
              className="hover:text-white transition"
            >
              GitHub
            </a>

            <a
              href="#"
              className="hover:text-white transition"
            >
              LinkedIn
            </a>

            <a
              href="#"
              className="hover:text-white transition"
            >
              Twitter
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;