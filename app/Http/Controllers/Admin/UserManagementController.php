<?php

namespace App\Http\Controllers\Admin;


use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Data\Admin\USerManagementPageData;
use App\Services\UserManagement\UserManagementService;

class UserManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $user;

    public function __construct(UserManagementService $UserManagementService)
    {
        $this->user = $UserManagementService;
    }
    public function index()
    {
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = USerManagementPageData::from([
            'page' => $request->input('page', 1),
            'perPage' => $request->input('perPage', 1),

        ]);
        $allUser = $this->user->getAllUsers($data);
        $admin = Auth::guard('admin')->user();
        return Inertia::render('Admin/UserManagement', ['auth' => $admin, 'allUser' => $allUser]);

        // return response()->json(['user' => $allUser]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
