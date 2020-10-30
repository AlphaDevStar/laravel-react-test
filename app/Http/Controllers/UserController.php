<?php


namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function showall(Request $request)
    {
        $users = User::all();
        //$users = User::orderBy('created_at', 'asc')->get();
//        return response()->json([
//            $users
//        ], 201);
        return $users->toJson();
    }

    public function delete(Request  $request)
    {
        $user = User::findOrFail($request->id);
        $user->delete();
        return response()->json([
            'success' => true
        ], 201);
    }

    public function save(Request $request)
    {
        if (intval($request->id) === 0)
        {
            $user = new User([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => bcrypt($request->input('password'))
            ]);

            $res = $user->save();

        }
        else{
            $user = User::findOrFail($request->id);
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            if ($request->input('email') !== '')
            {
                $user->password = bcrypt($request->input('password'));
            }
            $res = $user->save();
        }

        return response()->json([
            'success' => true
        ], 201);
    }

    public function show(Request $request)
    {
        return User::findOrFail($request->id)->toJson();
    }

}
