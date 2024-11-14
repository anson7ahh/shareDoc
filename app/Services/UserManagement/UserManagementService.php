<?php

namespace App\Services\UserManagement;

use LaravelEasyRepository\BaseService;

interface UserManagementService extends BaseService
{

    public function getAllUsers($data);
}
