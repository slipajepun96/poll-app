import VoterLayout from '@/Layouts/VoterLayout';
import { Head } from '@inertiajs/react';
import PollConfirmSelection from './Partials/PollConfirmSelection';
import { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';

export default function PollIndex({ candidates, voter }) {
    const topRef = useRef(null);
    const [showIntro, setShowIntro] = useState(true);

    const questions = [
        { id: 1, text: "Siapa paling komited?" },
        { id: 2, text: "Siapa paling rajin?" },
        { id: 3, text: "Siapa paling berdisiplin?" },
        { id: 4, text: "Siapa paling mesra?" },
        { id: 5, text: "Siapa paling cepat respon?" },
        { id: 6, text: "Siapa paling positif?" },
        { id: 7, text: "Siapa paling aktif dalam program syarikat?" },
        { id: 8, text: "Siapa paling suka membantu?" },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});

    const handleSelect = (candidateId) => {
        setAnswers({
            ...answers,
            [questions[currentQuestion].id]: candidateId
        });
    };

    const scrollToTop = () => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            scrollToTop();
        } else if (currentQuestion === questions.length - 1) {
            // Already at last question, but still scroll to top
            scrollToTop();
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };
    
    const allAnswered = Object.keys(answers).length === questions.length;

    const handleSubmit = () => {
        scrollToTop();
        router.post('/poll/submit', {
            voter_id: voter.id,
            answers: answers
        });
    };

    if (showIntro) {
        return (
            <VoterLayout>
                <div className="flex flex-col items-center justify-center min-h-screen">
                    {/* Edit this content as you like */}
                    <h1 className="text-3xl font-bold mb-4 text-white">Selamat Datang {voter.participant_name} </h1>
                    <h1 className="text-xl font-bold mb-4 text-white">Anda akan mengundi pemenang untuk Anugerah Pekerja Paling Cemerlang PKPP Agro 2024.</h1>
                    <p className="mb-2 text-white font-bold uppercase underline">Sila baca maklumat di bawah sebelum memulakan undian anda.</p>
                    <p className="mb-2 text-white">1. Terdapat 8 soalan, sila pilih seorang calon untuk setiap soalan.</p>
                    <p className="mb-2 text-white">2. Anda boleh menukar pilihan anda pada bila-bila masa sebelum menghantar undian.</p>
                    <p className="mb-2 text-white">3. Pastikan anda telah memilih calon untuk semua soalan sebelum menghantar undian.</p>
                    <button
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                        onClick={() => setShowIntro(false)}
                    >
                        Mula Undian
                    </button>
                </div>
            </VoterLayout>
        );
    }

    return (
        <VoterLayout>
            <Head title="Poll" />
            <div ref={topRef} className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg md:flex md:flex-row justify-center items-center">
                        <div className="p-6 text-gray-900">
                            <img src="/img/2394071.png" className='w-48 h-auto' alt="" />
                        </div>
                        <div className="p-6 text-white text-2xl">
                            <div className='font-bold'>Soalan {questions[currentQuestion].id}</div>
                            <div>{questions[currentQuestion].text}</div>

                        </div>
                    </div>
                    <div className="gap-2 mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-2">
                        {(candidates || []).map(candidate => (
                            candidate.participant_nric !== voter.participant_nric && (
                                <button
                                    key={candidate.id} 
                                    className={` ${answers[questions[currentQuestion].id] === candidate.id ? 'bg-blue-500 text-white' : 'bg-white text-black'} rounded-lg p-2`}
                                    onClick={() => handleSelect(candidate.id)}
                                >
                                    <span className='font-bold'>{candidate.participant_name}</span>
                                    {/* <PollConfirmSelection candidate={candidate} voter={voter} /> */}
                                </button>
                            )
                        ))}
                    </div>
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={handlePrev}
                            disabled={currentQuestion === 0}
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Sebelumnya
                        </button>
                        {currentQuestion === questions.length - 1 && allAnswered && (
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-green-600 text-white rounded"
                            >
                                Hantar Undian
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            disabled={currentQuestion === questions.length - 1}
                            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                        >
                            Seterusnya
                        </button>
                    </div>
                </div>
            </div>
        </VoterLayout>
    );
}