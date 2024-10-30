<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class CreateCommentData extends Data
{
  public function __construct(
    public int $document_id,
    public string $body,
    public int $user_id,

  ) {
  }
}
