<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usersform', function (Blueprint $table) {
            $table->id();
            $table->string('fullName');
            $table->string('company')->nullable();
            $table->string('email');
            $table->string('phoneNumber')->nullable();
            $table->text('message')->nullable();
            $table->string('hear')->nullable();
            $table->json('interestProduct')->nullable();
            $table->boolean('newsProduct')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usersform');
    }
};
