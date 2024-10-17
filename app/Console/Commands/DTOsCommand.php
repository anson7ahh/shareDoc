<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;

class DTOsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:dto {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'success';

    /**
     * Execute the console command.
     */
    protected $files;

    public function __construct(Filesystem $files)
    {
        parent::__construct();
        $this->files = $files;
    }
    public function handle()
    {
        $name = $this->argument('name');
        $this->createDTOsClass($name);
    }
    protected function createDTOsClass($name)
    {
        $folderPath = app_path('DTOs');


        if (!$this->files->exists($folderPath)) {
            $this->files->makeDirectory($folderPath, 0755, true);
            $this->info("Thư mục đã được tạo: {$folderPath}");
        } else {
            $this->info("Thư mục đã tồn tại: {$folderPath}");
        }

        // Đường dẫn file dto
        $filePath = $folderPath . "/{$name}.php";

        // Kiểm tra file đã tồn tại chưa
        if ($this->files->exists($filePath)) {
            $this->error('File dto đã tồn tại!');
        } else {
            // Nội dung của file builder
            $stub = $this->getStubContent($name);

            // Tạo file
            $this->files->put($filePath, $stub);
            $this->info("dto class đã được tạo: {$filePath}");
        }
    }
    protected function getStubContent($name)
    {
        return <<<EOT
<?php

namespace App\DTOs;

class {$name}
{
   
}
EOT;
    }
}
