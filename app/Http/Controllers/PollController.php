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
    // dd(Participant::where('id', Auth::guard('participant')->id())->whereNull('poll_completed_at')->exists());
        if (Participant::where('id', Auth::guard('participant')->id())->whereNull('poll_completed_at')->exists()) {
            $participants = Participant::where('is_candidate','=','1')->get();
            // dd($participants);
            // return Redirect::route('poll.index')->with('participants', $participants);
            return Inertia::render('Poll/PollIndex', [
                'participants' => $participants,
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
        if (Participant::where('id', Auth::guard('participant')->id())->whereNull('poll_completed_at')->exists()) {

        }
        else {
            return Redirect::route('poll.finish');
        }
        $validated = $request->validate([
            'voter_id' => 'required|exists:participants,id',
            'candidate_id' => 'required|exists:participants,id',
        ]);

        try {
            // Create the vote
            Vote::create([
                'voter_id' => $validated['voter_id'],
                'candidate_id' => $validated['candidate_id'],
            ]);

            //update has_voted
            $participant = Participant::find($validated['voter_id']);
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
    }

    public function finishVote()
    {
        return Inertia::render('Poll/PollFinishVote');
    }

    public function dashboard()
    {
        $votes = Vote::all();

        //number of votes
        $totalVotes = Vote::all()->count();
        $totalVoter = Participant::all()->count();
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
