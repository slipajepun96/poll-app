<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class Vote extends Model
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
        'voter_id',
        'candidate_id',
        'question_num',
    ];

    // public function participants()
    // {
    //     return $this->hasMany(\App\Models\Ownership::class, 'allottee_id', 'id');
    // }

    // public function transactionlists()
    // {
    //     return $this->hasMany(\App\Models\TransactionList::class, 'allottee_id', 'id');
    // }
}
