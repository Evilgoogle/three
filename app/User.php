<?php

namespace App;

use App\Notifications\MailResetPasswordToken;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\DB;
use Zizaco\Entrust\Traits\EntrustUserTrait;

class User extends Authenticatable
{
    use Notifiable;
    use EntrustUserTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new MailResetPasswordToken($token));
    }

    public static function removeUser($id)
    {
        DB::table('users')
            ->where('id', $id)
            ->delete();
    }

    public static function getAdministration()
    {
        //$roles = Role::select('id')->whereIn('name', ['superadmin', 'editor'])->get();

        return DB::table('users as u')
            ->select('u.id', 'u.name', 'u.email')
            ->Join('role_user as ru', 'ru.user_id', '=', 'u.id')
            //->whereIn('ru.role_id', $roles->pluck('id'))
            ->groupBy('u.id')
            ->get();
    }
}
