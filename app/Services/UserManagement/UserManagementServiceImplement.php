<?php

namespace App\Services\UserManagement;

use LaravelEasyRepository\ServiceApi;
use App\Repositories\UserManagement\UserManagementRepository;

class UserManagementServiceImplement extends ServiceApi implements UserManagementService
{

  /**
   * set title message api for CRUD
   * @param string $title
   */
  protected $title = "";
  /**
   * uncomment this to override the default message
   * protected $create_message = "";
   * protected $update_message = "";
   * protected $delete_message = "";
   */

  /**
   * don't change $this->mainRepository variable name
   * because used in extends service class
   */
  protected $mainRepository;

  public function __construct(UserManagementRepository $mainRepository)
  {
    $this->mainRepository = $mainRepository;
  }

  public function getAllUsers($data)
  {
    return $this->mainRepository->getAllUsers($data);
  }
}
