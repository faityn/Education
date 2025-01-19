import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-900 w-full">
      <div
        className={`max-w-[1280px]  mx-auto py-[30px] px-0 border-t border-gray-800 dark:border-gray-700`}
      >
        <div className="container relative">
          <div className="grid md:grid-cols-2 items-center gap-6">
            <div className="">
              <Link
                className="block flex-shrink-0 text-3xl text-[#0aba4f] font-bold uppercase"
                href="/"
              >
                Logo
              </Link>
            </div>
            <div className="  text-right">
              <p className="mb-0 text-gray-300">
                © 2025 - Copyright All Rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
