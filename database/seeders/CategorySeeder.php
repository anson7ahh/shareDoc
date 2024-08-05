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
        $child1 = Category::create(['name' => 'Child Category ', 'slug' => Str::slug('Child Category ')]);
        $child2 = Category::create(['name' => 'Child Category ', 'slug' => Str::slug('Child Category ')]);

        // // Thêm các danh mục con vào danh mục gốc
        $child1->makeChildOf($root);
        $child2->makeChildOf($root);
        $root2 = Category::create(['name' => 'Root Category 2', 'slug' => Str::slug('Root Category 2')]);
        $root2->makeRoot();
        // // Tạo các danh mục con
        $child1 = Category::create(['name' => 'Child Category 2', 'slug' => Str::slug('Child Category 2')]);
        $child2 = Category::create(['name' => 'Child Category 2', 'slug' => Str::slug('Child Category 2')]);

        // // Thêm các danh mục con vào danh mục gốc
        $child1->makeChildOf($root2);
        $child2->makeChildOf($root2);
        // Tạo các danh mục con cho Child Category 1
        $subChild1 = Category::create(['name' => 'Sub-Child Category 1', 'slug' => Str::slug('Sub-Child Category 1')]);
        $subChild2 = Category::create(['name' => 'Sub-Child Category 2', 'slug' => Str::slug('Sub-Child Category 2')]);

        // Thêm các danh mục con vào Child Category 1
        $subChild1->makeChildOf($child1);
        $subChild2->makeChildOf($child1);

        // Tạo các danh mục con cho Child Category 2
        $subChild3 = Category::create(['name' => 'Sub-Child Category 3', 'slug' => Str::slug('Sub-Child Category 3')]);
        $subChild4 = Category::create(['name' => 'Sub-Child Category 4', 'slug' => Str::slug('Sub-Child Category 4')]);

        // Thêm các danh mục con vào Child Category 2
        $subChild3->makeChildOf($child2);
        $subChild4->makeChildOf($child2);
    }
}
