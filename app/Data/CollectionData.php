<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class CollectionData extends Data
{
  public function __construct(
    public ?int $user_id,
  ) {
  }
}
