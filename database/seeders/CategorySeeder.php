<?php

namespace Database\Seeders;


use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;


class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $root = Category::create(['name' => 'Root Category ', 'slug' => Str::slug('Root Category ')]);
        $root->makeRoot();
        // // Tạo các danh mục con
        $parent1 = Category::create(['name' => 'Child Category ', 'slug' => Str::slug('Child Category ')]);
        $parent2 = Category::create(['name' => 'Child Category ', 'slug' => Str::slug('Child Category ')]);

        // // Thêm các danh mục con vào danh mục gốc
        $parent1->makeChildOf($root);
        $parent2->makeChildOf($root);


        $Child1 = Category::create(['name' => 'Sub-Child Category 1', 'slug' => Str::slug('Sub-Child Category 1')]);
        $Child2 = Category::create(['name' => 'Sub-Child Category 2', 'slug' => Str::slug('Sub-Child Category 2')]);

        // // Thêm các danh mục con vào Child Category 1
        $Child1->makeChildOf($parent1);
        $Child2->makeChildOf($parent2);


        $root2 = Category::create(['name' => 'Root Category 2', 'slug' => Str::slug('Root Category 2')]);
        $root2->makeRoot();
        // // // Tạo các danh mục con
        $parent1 = Category::create(['name' => 'Child Category 2', 'slug' => Str::slug('Child Category 2')]);
        $parent2 = Category::create(['name' => 'Child Category 2', 'slug' => Str::slug('Child Category 2')]);

        // // // Thêm các danh mục con vào danh mục gốc
        $parent1->makeChildOf($root2);
        $parent2->makeChildOf($root2);
        // // Tạo các danh mục con cho Child Category 1


        // // Tạo các danh mục con cho Child Category 2
        $Child3 = Category::create(['name' => 'Sub-Child Category 3', 'slug' => Str::slug('Sub-Child Category 3')]);
        $Child4 = Category::create(['name' => 'Sub-Child Category 4', 'slug' => Str::slug('Sub-Child Category 4')]);

        // // Thêm các danh mục con vào Child Category 2
        $Child3->makeChildOf($parent2);
        $Child4->makeChildOf($parent1);
    }
}
