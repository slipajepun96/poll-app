import VoterLayout from '@/Layouts/VoterLayout';
import { Head } from '@inertiajs/react';
import PollConfirmSelection from './Partials/PollConfirmSelection';
import { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';

export default function PollIndex({ candidates, voter }) {
    const topRef = useRef(null);
    const [showIntro, setShowIntro] = useState(true);

    const questions = [
        { id: 1, text: "Kehadiran & Ketepatan Masa", desc: "Disiplin datang kerja, jarang ponteng atau lewat." },
        { id: 2, text: "Prestasi Kerja", desc: "Hasil kerja berkualiti, siap pada masa, ikut standard." },
        { id: 3, text: "Kerjasama & Teamwork", desc: "Senang bekerjasama, membantu rakan sekerja." },
        { id: 4, text: "Sikap & Disiplin", desc: "Hormat peraturan, beradab dengan rakan sekerja dan majikan." },
        { id: 5, text: "Komunikasi", desc: "Pandai berinteraksi, jelas memberi arahan/pendapat, mendengar orang lain." },
        { id: 6, text: "Inisiatif & Proaktif", desc: "Rajin, berusaha lebih tanpa disuruh, ada idea untuk tambah baik kerja." },
        { id: 7, text: "Sikap Positif & Peribadi", desc: "Sentiasa ceria, tidak mudah marah, memberi aura positif." },
        { id: 8, text: "Kebolehpercayaan & Tanggungjawab", desc: "Amanah, boleh diharap bila diberi tugasan penting." },
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
                        <h1 className="text-xl font-bold mb-4 text-gray-900">Anda akan mengundi pemenang untuk Anugerah Pekerja Paling Cemerlang PKPP Agro 2024.</h1>
                        <p className="mb-2 text-gray-900 font-bold uppercase underline">Sila baca maklumat di bawah sebelum memulakan undian anda.</p>
                        <p className="mb-2 text-gray-900">1. Terdapat 8 soalan, sila pilih seorang calon untuk setiap soalan.</p>
                        <p className="mb-2 text-gray-900">2. Anda boleh menukar pilihan anda pada bila-bila masa sebelum menghantar undian.</p>
                        <p className="mb-2 text-gray-900">3. Pastikan anda telah memilih calon untuk semua soalan sebelum menghantar undian.</p>
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

    return (
        <VoterLayout>
            <Head title="Poll" />
            <div ref={topRef} className="py-2 md:py6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg md:flex md:flex-row just items-center">
                        <div className="p-2 md:p-6 text-gray-900">
                            <img src="https://www.pkppagro.com.my/img/logo-small.png" className='w-10 md:w-32 h-auto' alt="" />
                        </div>
                        <div className="p-2 md:p-6 ">
                            <div className='font-bold text-2xl text-gray-900'>Kriteria {questions[currentQuestion].id}</div>
                            <div className='text-4xl font-black text-gray-900'>{questions[currentQuestion].text}</div>
                            <div className='text-2xl text-gray-900'>{questions[currentQuestion].desc}</div>

                        </div>
                    </div>
                    <div className="gap-2 mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-2">
                        {(candidates || []).map(candidate => (
                            candidate.participant_nric !== voter.participant_nric && (
                                <button
                                    key={candidate.id} 
                                    className={` ${answers[questions[currentQuestion].id] === candidate.id ? 'bg-blue-500 text-white' : 'bg-white text-black border'} rounded-lg p-2`}
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