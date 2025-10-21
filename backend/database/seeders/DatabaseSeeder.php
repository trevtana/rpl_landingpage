<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (!User::where('email', 'admin@rpl.com')->exists()) {
            User::create([
                'name' => 'Admin RPL',
                'email' => 'admin@rpl.com',
                'password' => bcrypt('angkatan50!'),
                'role' => 'admin',
            ]);
        }

        if (!User::where('email', 'dokpub@rpl.com')->exists()) {
            User::create([
                'name' => 'Divisi Dokumentasi & Publikasi',
                'email' => 'dokpub@rpl.com',
                'password' => bcrypt('angkatan50!'),
                'role' => 'dokumentasi',
            ]);
        }

        $this->call([
            ActivitySeeder::class,
            AchievementsSeeder::class,
        ]);
    }
}
