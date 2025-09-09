<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\Participant;
use App\Models\Vote;

class PollController extends Controller
{
    public function voterLogin(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'participant_nric' => 'required|string|size:12',
        ]);

        $participant = Participant::where('participant_nric', $validated['participant_nric'])->first();

        if ($participant) {
            Auth::guard('participant')->login($participant);
            $request->session()->regenerate();
            return redirect('/poll');

            // $participants = Participant::where('is_candidate','=','1')->get();
            // return Redirect::route('poll.index')->with('participants', $participants);
        }

        return back()->withErrors([
            'participant_nric' => 'No. Kad Pengenalan Tidak Dijumpai. Sila semak nombor kad pengenalan dan cuba semula',
        ]);
    }

    public function indexPoll(): Response
    {
        // if (Participant::where('id', Auth::guard('participant')->id())->exists()) {
        if (Participant::where('id', Auth::guard('participant')->id())->whereNull('poll_completed_at')->exists()) {
            $candidates = Participant::where('is_candidate','=','1')->get();
            // dd($participants);
            // return Redirect::route('poll.index')->with('participants', $participants);
            return Inertia::render('Poll/PollIndex', [
                'candidates' => $candidates,
                'voter' => Auth::guard('participant')->user(),
            ]);
        }
        else {
            // return Redirect::route('poll.finish');
            return Inertia::render('Poll/PollFinishVote');
        }


    }

    public function submitVote(Request $request): RedirectResponse
    {
        $data = $request->all();
        $voterId = $data['voter_id'];
        $answers = $data['answers'];

        if (Participant::where('id', $voterId)->exists() && Participant::where('id', $voterId)->whereNull('poll_completed_at')->exists()) {
            try {
                foreach ($answers as $questionNum => $candidateId) {
                    Vote::create([
                        'voter_id' => $voterId,
                        'candidate_id' => $candidateId,
                        'question_num' => $questionNum,
                    ]);
                }
                //update has_voted
                $participant = Participant::find($voterId);
                $participant->poll_completed_at = date('Y-m-d H:i:s');
                $participant->save();
            } catch (\Exception $e) {
                \Log::error('Database error:', [
                    'message' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                return redirect()->back()
                    ->with('error', 'Failed to save vote')
                    ->withErrors(['database' => $e->getMessage()]);
            }
            return redirect('/poll/finish')->with('success', 'Vote submitted successfully.');
        } else {
            return Redirect::route('poll.finish');
        }
    }

    public function finishVote()
    {
        return Inertia::render('Poll/PollFinishVote');
    }

    public function dashboard()
    {
        $votes = Vote::all();

        //number of votes
        // $totalVotes = Vote::all()->count();
        $totalVoter = Participant::all()->count();
        $totalVotes = Participant::whereNotNull('poll_completed_at')->count();
        // dd($votes);
        //calculate number of votes for each candidate, add name of each candidate return in one row

        $voteCounts = $votes->groupBy('candidate_id')->map(function ($group) {
            $name = Participant::find($group->first()->candidate_id)->participant_name;
            return [
                'name' => $name,
                'count' => $group->count()
            ];
        })->values()->toArray();

        //arrange by vote count descending
        usort($voteCounts, fn($a, $b) => $b['count'] <=> $a['count']);

        // dd($totalVotes);
        return Inertia::render('Dashboard', [
            // 'votes' => $votes,
            'voteCounts' => $voteCounts,
            'totalVotes' => $totalVotes,
            'totalVoter' => $totalVoter
        ]);
    }
}
