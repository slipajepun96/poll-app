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
                    <div className="overflow-hidden shadow-sm sm:rounded-lg md:flex md:flex-row justify-center items-center">
                        <div className="p-6 text-gray-900">
                            <img src="/img/2394071.png" className='w-48 h-auto' alt="" />
                        </div>
                        <div className="p-6 text-white text-2xl">
                            Undi calon pilihan anda bagi <p className="font-bold">Anugerah Pekerja Paling Cemerlang PKPP Agro 2025!</p>
                            <div className='text-lg'>
                                <span className="font-bold">Kriteria Pemilihan :</span>
                                <ul className='list-disc pl-5'>
                                    <li>Mudah & Mesra Bergaul</li>
                                    <li>Berpengalaman dalam bidang</li>
                                    <li>Komited terhadap tugas</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="gap-2 mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-2">
                        {(participants || []).map(participant => (
                            participant.participant_nric !== voter.participant_nric && (
                                <PollConfirmSelection candidate={participant} voter={voter} />
                            )

                        ))}
                    </div>

                </div>
            </div>
        </VoterLayout>
    );
}