<?php

use App\Enums\DocumentStatusEnum;
use App\Enums\DocumentFavoriteEnum;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->softDeletes();
            $table->string('title')->nullable();
            $table->string('slug')->nullable();
            $table->string('format');
            $table->string('content');
            $table->integer('view')->default(0);
            $table->string('source')->nullable();
            $table->integer('point')->nullable();
            $table->string('description')->nullable();
            $table->enum('status', DocumentStatusEnum::getValues())->default(DocumentStatusEnum::notreviewed);
            $table->unsignedBigInteger('users_id');
            $table->timestamps();
            $table->foreign('users_id')->references('id')->on('users')->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
