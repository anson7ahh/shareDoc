<?php

namespace App\Data\Admin;

use Spatie\LaravelData\Data;

class USerManagementPageData extends Data
{
  public function __construct(
    public int $page,
    public int $perPage,
  ) {
  }
}
