import React from "react";
import logo from "../assets/logo.svg";
import { BatteryIcon, HomeIcon, PhoneIcon, TruckIcon } from "../assets/vectors";

export default function SideNav() {
  return (
    <div className="w-[325px] flex flex-col bg-linear-[89.3deg,#2605F1_0.54%,#7620D9_99.34%] pt-12 pb-8 px-4">
      <p className="font-grotesk font-semibold text-white text-3xl mb-6">
        Load Profile Generator
      </p>

      <nav className="flex flex-col flex-grow">
        <ul className="flex flex-col gap-4">
          <li className="flex gap-3 bg-indigo-600 py-4 px-3 rounded-md cursor-pointer text-white">
            <HomeIcon />
            <p className="font-semibold">Heat Pump</p>
          </li>
          <li className="flex gap-3 bg-transparent py-4 px-3 text-indigo-100 opacity-50">
            <TruckIcon />
            <p className="font-semibold">Electric Vehicle</p>
            <p className="ml-2 text-indigo-600 font-medium leading-[18px] text-xs py-0.5 px-2 bg-white rounded-2xl">
              Coming Soon
            </p>
          </li>
          <li className="flex gap-3 bg-transparent py-4 px-3 text-indigo-100 opacity-50">
            <BatteryIcon />
            <p className="font-semibold">Home Battery</p>
            <p className="ml-2 text-indigo-600 font-medium leading-[18px] text-xs py-0.5 px-2 bg-white rounded-2xl">
              Coming Soon
            </p>
          </li>
        </ul>
        <div className="mt-auto">
          <a
            href="https://www.bellawatt.com/contact"
            target="_blank"
            rel="noreferrer"
            className="flex gap-3 py-2 px-3 rounded-md cursor-pointer text-white mb-6"
          >
            <div className="text-white">
              <PhoneIcon />
            </div>
            <p className="font-semibold text-white">Contact Bellawatt</p>
          </a>
          <div className="pt-6 border-t border-indigo-600">
            <p className="text-xs font-medium text-indigo-900 font-ppMori">
              powered by
            </p>
            <img src={logo} alt="Bellawatt logo" height={20} />
          </div>
        </div>
      </nav>
    </div>
  );
}
