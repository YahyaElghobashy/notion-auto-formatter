import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

/**
 * FormatMenu component for formatting options
 * Uses Headless UI for accessibility and behavior
 */
const FormatMenu = ({ options, onSelect, label = 'Format' }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium 
                             text-slate-primary bg-white border border-slate-200 rounded-nf 
                             hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                             focus:ring-indigo-light shadow-nf-sm">
          {label}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Menu.Button>
      </div>
      
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white 
                            divide-y divide-slate-100 rounded-nf shadow-nf-lg ring-1 
                            ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="px-1 py-1">
            {options.map((option) => (
              <Menu.Item key={option.id}>
                {({ active }) => (
                  <button
                    onClick={() => onSelect(option.id)}
                    className={`${
                      active ? 'bg-indigo-primary text-white' : 'text-slate-primary'
                    } group flex rounded-nf items-center w-full px-2 py-2 text-sm`}
                  >
                    {option.icon && (
                      <span className="mr-2 h-5 w-5 text-slate-400 group-hover:text-white">
                        {option.icon}
                      </span>
                    )}
                    <span>{option.label}</span>
                    {option.shortcut && (
                      <span className="ml-auto text-xs text-slate-400 group-hover:text-indigo-50">
                        {option.shortcut}
                      </span>
                    )}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default FormatMenu; 