import VoterLayout from '@/Layouts/VoterLayout';
import { Head } from '@inertiajs/react';
import PollConfirmSelection from './Partials/PollConfirmSelection';
import { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';

export default function PollIndex({ candidates, voter }) {
    const topRef = useRef(null);
    const [showIntro, setShowIntro] = useState(true);

    const questions = [
        { id: 1, text: "Ibu Pejabat PKPP Agro", department: "HQ", desc: "" },
        { id: 2, text: "Ladang Sungai Kerpai", department: "LSK", desc: "Hasil kerja berkualiti, siap pada masa, ikut standard." },
        { id: 3, text: "Ladang PKPP Paloh Hinai", department: "LPH", desc: "Senang bekerjasama, membantu rakan sekerja." },
        { id: 4, text: "Ladang PKPP Sri Jelutong", department: "LSJ", desc: "Hormat peraturan, beradab dengan rakan sekerja dan majikan." },
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
        if (currentQuestion < questions.length - 1 && !!answers[questions[currentQuestion].id]) {
            setCurrentQuestion(prev => {
                const next = prev + 1;
                setTimeout(() => scrollToTop(), 0);
                return next;
            });
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
    const isAnswered = !!answers[questions[currentQuestion].id];

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
                <div className="flex flex-col items-center justify-center min-h-screen p-6">
                    {/* Edit this content as you like */}
                    {/* <div className=' rounded-xl bg-green-300/50 p-6'> */}
                        <h1 className="text-3xl font-bold mb-4 text-gray-900">Selamat Datang {voter.participant_name} </h1>
                        <h1 className="text-xl font-bold mb-4 text-gray-900">Anda akan mengundi pemenang untuk Anugerah Paling Sporting, Menyenangkan & Serba Boleh</h1>

                        <p>Kriteria pemilihan adalah seperti berikut:</p>
                        <div className='mb-4 flex flex-col md:flex-row gap-2'>
                            <div className='mb-4 bg-green-200 p-4 rounded-xl max-w-lg'>
                                <h1 className='font-bold text-2xl'>Paling Sporting</h1>
                                <p>Diberikan kepada individu atau pasukan yang menunjukkan semangat kesukanan tinggi, ceria, aktif menyertai semua aktiviti tanpa mengira menang atau kalah, serta positif sepanjang program.</p>
                            </div>
                            <div className='mb-4 bg-green-200 p-4 rounded-xl max-w-lg'>
                                <h1 className='font-bold text-2xl'>Menyenangkan</h1>
                                <p>Diberikan kepada individu yang mudah bekerjasama, tidak banyak kerenah, ramah, mesra, serta disukai oleh majoriti kerana sifatnya yang tenang dan memudahkan urusan.</p>
                            </div>
                            <div className='mb-4 bg-green-200 p-4 rounded-xl max-w-lg'>
                                <h1 className='font-bold text-2xl'>Serba Boleh</h1>
                                <p>Diberikan kepada individu yang berbakat dalam pelbagai bidang, contohnya mampu menyanyi, bersukan, berpidato, mengurus dan bergaul. Orang ini sering menonjol dalam pelbagai aktiviti dan boleh diharap dalam pelbagai situasi.</p>
                            </div>
                        </div>
                        <p className="mb-2 text-gray-900 font-bold uppercase underline">Sila baca maklumat di bawah sebelum memulakan undian anda.</p>
                        <p className="mb-2 text-gray-900">1. Anda akan mengundi 1 nama bagi setiap bahagian/ladang.</p>
                        <p className="mb-2 text-gray-900">2. Anda boleh menukar pilihan anda pada bila-bila masa sebelum menghantar undian.</p>
                        <p className="mb-2 text-gray-900">3. Pastikan anda telah memilih calon untuk semua soalan sebelum menghantar undian.</p>
                        <p className="mb-2 text-gray-900">4. Pemenang setiap kategori akan dipilih dari undian tertinggi setiap kategori</p>
                        <p className="mb-2 text-gray-900">5. Undi anda adalah rahsia</p>
                        <button
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                            onClick={() => setShowIntro(false)}
                        >
                            Mula Undian
                        </button>
                    {/* </div> */}
                    
                </div>
            </VoterLayout>
        );
    }

    // Filter candidates by department for the current question
    const filteredCandidates = (candidates || []).filter(candidate => candidate.department === questions[currentQuestion].department);

    return (
        <VoterLayout>
            <Head title="Poll" />
            <div ref={topRef} className="py-2 md:py6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg md:flex md:flex-row just items-center">
                        <div className="p-2 md:p-6 text-gray-900 items-start justify-start">
                            <img src="https://www.pkppagro.com.my/img/logo-small.png" className='w-10 md:w-32 h-auto' alt="" />
                        </div>
                        <div className="p-2 md:p-6 ">
                            <div className='font-bold text-2xl text-gray-900'>Undian {questions[currentQuestion].id}</div>
                            <div className='text-4xl font-black text-gray-900'>{questions[currentQuestion].text}</div>
                            {/* <div className='text-2xl text-gray-900'>{questions[currentQuestion].desc}</div> */}
                            <div className='text-lg text-gray-900'>Pada pandangan anda, siapakan yang layak memenangi <span className='font-bold uppercase'>Anugerah Paling Sporting, Menyenangkan & Serba Boleh</span> di antara calon dari {questions[currentQuestion].text}?</div>
                            <div className='mb-4 flex flex-col md:flex-row gap-2'>
                                <div className='mb-4 bg-green-200 p-4 rounded-xl max-w-lg'>
                                    <h1 className='font-bold text-2xl'>Paling Sporting</h1>
                                    <p>Diberikan kepada individu atau pasukan yang menunjukkan semangat kesukanan tinggi, ceria, aktif menyertai semua aktiviti tanpa mengira menang atau kalah, serta positif sepanjang program.</p>
                                </div>
                                <div className='mb-4 bg-green-200 p-4 rounded-xl max-w-lg'>
                                    <h1 className='font-bold text-2xl'>Menyenangkan</h1>
                                    <p>Diberikan kepada individu yang mudah bekerjasama, tidak banyak kerenah, ramah, mesra, serta disukai oleh majoriti kerana sifatnya yang tenang dan memudahkan urusan.</p>
                                </div>
                                <div className='mb-4 bg-green-200 p-4 rounded-xl max-w-lg'>
                                    <h1 className='font-bold text-2xl'>Serba Boleh</h1>
                                    <p>Diberikan kepada individu yang berbakat dalam pelbagai bidang, contohnya mampu menyanyi, bersukan, berpidato, mengurus dan bergaul. Orang ini sering menonjol dalam pelbagai aktiviti dan boleh diharap dalam pelbagai situasi.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gap-2 mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-2">
                        {filteredCandidates.map(participant => (
                            participant.participant_nric !== voter.participant_nric && (
                                <button
                                    key={participant.id}
                                    className={`p-4 rounded-xl font-bold shadow ${answers[questions[currentQuestion].id] === participant.id ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                                    onClick={() => handleSelect(participant.id)}
                                >
                                    {participant.participant_name}
                                    {/* <PollConfirmSelection candidate={participant} voter={voter} /> */}
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
                        {allAnswered && (
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-green-600 text-white rounded"
                            >
                                Hantar Undian
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            disabled={currentQuestion === questions.length - 1 || !isAnswered}
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