// Sidebar.js
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
const MenuItem = ({ item }) => {
  const router = useRouter();

  if (item.isFolder) {
    return <FolderItem key={item.id} item={item} />;
  } else {
    return (
      <li key={item.id} className="pl-3 mt-1">
        <Link href={`/${item.id}`}>
          <a
            className={`flex w-full relative cursor-pointer items-center justify-between rounded-md pl-2 py-1 text-left text-sm font-medium ${
              router.asPath === `/${item.id}` ? "bg-gray-700 text-blue-400" : ""
            } hover:bg-gray-700`}
          >
            {item.name}
          </a>
        </Link>
      </li>
    );
  }
};
const SvgDrop = () => {
  return (
    <>
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width={20}
        height={20}
        className="nx-h-[18px] nx-min-w-[18px] nx-rounded-sm nx-p-0.5 hover:nx-bg-gray-800/5 dark:hover:nx-bg-gray-100/5 drop-down-svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
          className="nx-origin-center nx-transition-transform rtl:-nx-rotate-180"
        ></path>
      </svg>
    </>
  );
};
const SvgUp = () => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      width={20}
      height={20}
      className="nx-h-[18px] nx-min-w-[18px] nx-rounded-sm nx-p-0.5 hover:nx-bg-gray-800/5 dark:hover:nx-bg-gray-100/5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
        className="nx-origin-center nx-transition-transform rtl:-nx-rotate-180 ltr:nx-rotate-90 rtl:nx-rotate-[-270deg]"
      ></path>
    </svg>
  );
};
const FolderItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="pl-3 pr-3 mt-1">
      <div
        className="flex justify-between items-center cursor-pointer hover:bg-gray-700 rounded-md pl-2 py-1"
        onClick={toggleFolder}
      >
        <span>{item.name}</span>

        {isOpen ? <SvgDrop /> : <SvgUp />}
      </div>
      {isOpen && (
        <ul className="">
          {item.items.map((child) => (
            <MenuItem key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Sidebar = ({ data, isOpen, toggleSidebar }) => {
  return (
    <>
      <nav
        className={`nav-comp-main fixed top-0 left-0 h-full bg-inherit text-white overflow-y-auto transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0  sidebar-show" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <ul className="last-of-type:mb-0 ul-main-nav">
          {data.items.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </ul>
      </nav>
      {isOpen && (
        <div
          className={`fixed inset-0 transition-opacity duration-300 ease-in-out `}
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
