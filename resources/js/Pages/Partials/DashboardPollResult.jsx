// import { Inertia } from '@inertiajs/inertia'; 
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';



export default function PollConfirmSelection({ voteCounts , totalVotes , totalVoter }) {
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['voteCounts', 'totalVotes', 'totalVoter'] });
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    console.log(totalVotes);
    const { post } = useForm();

    // Group voteCounts by department
    const votesByDepartment = voteCounts.reduce((acc, vote) => {
        if (!acc[vote.department]) acc[vote.department] = [];
        acc[vote.department].push(vote);
        return acc;
    }, {});

    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <p className='font-bold text-lg'>Jumlah Undi: {totalVotes} / {totalVoter} Pengundi</p>
                <div>
                    {totalVotes > 0 ? (
                        <p className='text-green-600'>Undi telah diterima</p>
                    ) : (
                        <p className='text-red-600'>Tiada undi diterima</p>
                    )}
                </div>
            </div>
            <p className='font-bold text-lg'>Kedudukan Terkini Undian</p>

            {Object.entries(votesByDepartment).map(([department, votes]) => (
                <div key={department} className="mb-8">
                    <h2 className="text-xl font-bold mb-2">{department}</h2>
                    <div className='gap-2 mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        {votes.map((vote) => (
                            <div key={vote.id} className='bg-sky-300/50 rounded-xl p-2 py-4'>
                                <h3 className='text-md font-semibold'>{vote.name}</h3>
                                <p className='text-gray-600 text-4xl font-bold'>{vote.count} undi</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            
        </div>
    );
}
