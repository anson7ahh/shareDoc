<?php

namespace App\Repositories\UserManagement;

use LaravelEasyRepository\Repository;

interface UserManagementRepository extends Repository
{

    public function getAllUsers($data);
}
