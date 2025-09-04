<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class Participant extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $keyType = 'string'; // Set the key type to UUID
    public $incrementing = false; // Disable auto-incrementing
   
    public static function booted()
    {
        static::creating(function($model)
        {
            $model->id = Str::uuid();
        });
    }
   
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'participant_nric',
        'participant_name',
        'poll_completed_at',
        'is_candidate',
    ];
}
