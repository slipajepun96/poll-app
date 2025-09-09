import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function VoterLayout({ header, children }) {
    // const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">

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
