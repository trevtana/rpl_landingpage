<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Activity;
use Carbon\Carbon;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $activities = [
            [
                'title' => 'Lomba Programming Competition 2024',
                'description' => 'Siswa RPL mengikuti lomba programming competition tingkat nasional dan berhasil meraih juara 2',
                'category' => 'Lomba',
                'date' => Carbon::create(2024, 8, 15),
                'location' => 'Bandung Convention Center',
                'image' => null,
            ],
            [
                'title' => 'Workshop React.js Advanced',
                'description' => 'Workshop pengembangan web menggunakan React.js untuk siswa kelas XI dan XII RPL',
                'category' => 'Kegiatan Jurusan',
                'date' => Carbon::create(2024, 9, 10),
                'location' => 'Lab Komputer RPL',
                'image' => null,
            ],
            [
                'title' => 'Kunjungan ke Kantor Tokopedia',
                'description' => 'Kunjungan industri untuk melihat langsung proses kerja di perusahaan teknologi',
                'category' => 'Kunjungan Industri',
                'date' => Carbon::create(2024, 7, 5),
                'location' => 'Tokopedia Tower, Jakarta',
                'image' => null,
            ],
            [
                'title' => 'Upacara Hari Kemerdekaan',
                'description' => 'Peringatan HUT RI ke-79 dengan upacara bendera',
                'category' => 'Kegiatan Sekolah',
                'date' => Carbon::create(2024, 8, 17),
                'location' => 'Lapangan Sekolah',
                'image' => null,
            ],
            [
                'title' => 'Pelatihan UI/UX Design',
                'description' => 'Pelatihan desain antarmuka dan pengalaman pengguna menggunakan Figma',
                'category' => 'Kegiatan Jurusan',
                'date' => Carbon::create(2024, 6, 15),
                'location' => 'Lab Multimedia',
                'image' => null,
            ],
            [
                'title' => 'Lomba Web Design Competition',
                'description' => 'Kompetisi desain website tingkat provinsi dengan tema digital transformation',
                'category' => 'Lomba',
                'date' => Carbon::create(2024, 10, 20),
                'location' => 'Universitas Pendidikan Indonesia',
                'image' => null,
            ],
        ];

        foreach ($activities as $activity) {
            Activity::create($activity);
        }
    }
}
