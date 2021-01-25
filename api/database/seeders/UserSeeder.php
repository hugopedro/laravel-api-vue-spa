<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        \App\Models\User::factory()->create([
            'first_name' => 'Hugo',
            'last_name' => 'Pedro',
            'email' => 'hugo@gmail.com',
            'password' => bcrypt('Password1'),
        ]);

        \App\Models\User::factory()->count(5)->create();
    }
}
