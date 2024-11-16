<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Data\Admin\USerManagementPageData;
use App\Services\UserManagement\UserManagementService;

class AdminController extends Controller
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
        $admin = Auth::guard('admin')->user();
        return Inertia::render('Admin/Dashboard', ['auth' => $admin]);
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
        //
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
