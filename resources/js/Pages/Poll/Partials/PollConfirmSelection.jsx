// import { Inertia } from '@inertiajs/inertia'; 
import { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import { useForm } from '@inertiajs/react';



export default function PollConfirmSelection({ candidate , voter }) {

    // const { data, setData, post, processing, errors, reset } = useForm({
    //     voter_id: '',
    //     candidate_id: '',
    // });

    const { post } = useForm();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const submit = (e) => {
        e.preventDefault();
        // console.log('onSuccess', data);

        post(route('poll.submit', { voter_id: voter.id, candidate_id: candidate.id }), {
            // preserveScroll: true,
            onSuccess: () => {
                setIsDialogOpen(false);
            },
            onError: (errors) => {
                console.error('Poll failed:', errors);
            },
        });
    };

    const handleDialogClose = (isOpen) => {
        setIsDialogOpen(isOpen);

        if (!isOpen) {
            reset(
              'voter_id',
              'candidate_id',
            );
        }
    };
    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
                <div key={candidate.id} className='bg-white border shadow rounded-xl p-2 text-center h-20 hover:bg-sky-600 hover:text-white font-bold hover:font-extrabold'>
                    {candidate.participant_name}
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Pasti untuk mengundi?</DialogTitle>
                    {/* <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription> */}
                </DialogHeader>
                <div>
                    <p>Adakah anda pasti untuk mengundi <span className="font-bold">{candidate.participant_name}</span>?</p>
                </div>
                <form onSubmit={submit}>
                    <div className="items-center space-y-2">
                        {/* <div className="grid flex-1 gap-2">
                            <div className='grid grid-cols-2 gap-2'>
                                <div>
                                    <TextInput
                                        id="candidate_id"
                                        name="candidate_id"
                                        value={candidate.id}
                                        className="mt-1 block w-full"
                                        autoComplete="candidate_id"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData('candidate_id', e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        id="voter_id"
                                        name="voter_id"
                                        value={voter.id}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData('voter_id', e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div> */}
                        <PrimaryButton>
                            Saya Undi!
                        </PrimaryButton>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
