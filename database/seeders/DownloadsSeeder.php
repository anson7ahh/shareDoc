<?php

namespace Database\Seeders;

use App\Models\Download;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DownloadsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('downloads')->insert([
            'documents_id' => 214,
            'users_id' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
