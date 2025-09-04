import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">


            <nav className="bg-gray-900 border-gray-700">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/dashboard" class="flex items-center space-x-3 rtl:space-x-reverse">
                        <span class="self-center text-2xl font-bold whitespace-nowrap text-white">Laman Undi</span>
                    </a>
                    <button data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden  focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                    <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
                        <li>
                        {/* <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</a> */}
                            <NavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                                className=""
                            >
                                Utama
                            </NavLink>
                        </li>

                        <li>
                            <NavLink 
                                href={route('profile.edit')} 
                                active={route().current('profile')}>
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </NavLink>
                        </li>
                        <li>
                            <div className="">
                                <div className="text-sm font-medium text-white">
                                    {user.name}
                                </div>
                                <div className="text-xs font-medium text-gray-300">
                                    {user.email}
                                </div>
                                
                            </div>
                        </li>



                    </ul>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-2 lg:px-4">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
