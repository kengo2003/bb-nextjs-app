import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="divide-y border-gray-400 dark:border-gray-800 border-b bg-white">
      <div className="px-4 py-3 md:py-6 lg:px-10">
        <div className="grid grid-cols-2 items-center space-y-2 md:space-y-0 md:space-x-6">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter text-black"
          >
            掲示板アプリ
          </Link>
          <nav className="flex items-center space-x-6 text-sm justify-self-end">
            <Link
              className="font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/about"
            >
              About
            </Link>
            <Link
              className="bg-black py-3 px-4 text-white rounded-md font-medium"
              href="/posts/create"
            >
              新規投稿
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
