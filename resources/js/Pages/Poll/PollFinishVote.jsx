import VoterLayout from '@/Layouts/VoterLayout';
import { Head } from '@inertiajs/react';
import PollConfirmSelection from './Partials/PollConfirmSelection';

export default function PollIndex({ participants, voter }) {

    // console.log(voter);

    return (
        <VoterLayout
        >
            <Head title="Poll" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg md:flex md:flex-col justify-center items-center">
                        <div className="p-6 text-gray-900">
                            <img src="/img/2394071.png" className='w-48 h-auto' alt="" />
                        </div>
                        <div className="p-6 text-gray-900 text-2xl">
                            Terima kasih atas penyertaan undi anda dalam<p className="font-bold">Anugerah Pekerja Paling Cemerlang PKPP Agro 2025</p>
                            <div className='text-lg'>
                                <span className="font-base mt-2">Nantikan keputusan penuh undian di Majlis Makan Malam Hari Keluarga PKPP Agro 2025 nanti!
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <p className='text-center text-gray-500'>by umar qayyum / itpasb</p>
        </VoterLayout>
    );
}