import React from "react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="bg-[#13131A] min-h-screen flex flex-col">
      <nav className="bg-[#1C1C24] shadow w-full px-6 py-3 flex items-center justify-between rounded-[20px]">
        <div className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="h-8" />
        </div>
        <div>
          <Link
            href="/register"
            className="ml-4 font-medium text-[#4ACD8D] hover:text-emerald-200"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="ml-4 font-medium text-[#4ACD8D] hover:text-emerald-200"
          >
            Login
          </Link>
        </div>
      </nav>
      <div className="flex-1 flex justify-center items-center px-6 py-12">
        {/* <Link
          href="/register"
          className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-800"
        >
          Get Started
        </Link> */}
        <img src="/hero.png" alt="Hero" className="w-full max-w-xl" />
      </div>
    </div>
  );
};

export default LandingPage;
