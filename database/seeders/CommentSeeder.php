<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('comments')->insert([
            'documents_id' => 1,
            'users_id' => 1,
            'body' => 'a',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('comments')->insert([
            'documents_id' => 1,
            'users_id' => 1,
            'body' => 'b',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
