<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Migrations for supply chain transactions derived from user-provided SQL.
     * Adds indexes on datetime and actor ids for query performance.
     */
    public function up(): void
    {
        Schema::create('farmer_collector_txn', function (Blueprint $table) {
            $table->id('txn_id');
            $table->foreignId('farmer_id')->constrained('farmers')->cascadeOnDelete();
            $table->foreignId('collector_id')->constrained('collectors')->cascadeOnDelete();
            $table->string('paddy_type', 50);
            $table->decimal('quantity', 10, 2);
            $table->dateTime('txn_datetime');
            $table->timestamps();
            $table->index(['farmer_id', 'collector_id']);
            $table->index('txn_datetime');
        });

        Schema::create('collector_miller_txn', function (Blueprint $table) {
            $table->id('txn_id');
            $table->foreignId('collector_id')->constrained('collectors')->cascadeOnDelete();
            $table->foreignId('miller_id')->constrained('millers')->cascadeOnDelete();
            $table->string('paddy_type', 50);
            $table->decimal('quantity', 10, 2);
            $table->dateTime('txn_datetime');
            $table->timestamps();
            $table->index(['collector_id', 'miller_id']);
            $table->index('txn_datetime');
        });

        Schema::create('miller_wholesaler_txn', function (Blueprint $table) {
            $table->id('txn_id');
            $table->foreignId('miller_id')->constrained('millers')->cascadeOnDelete();
            $table->foreignId('wholesaler_id')->constrained('wholesalers')->cascadeOnDelete();
            $table->string('rice_type', 50);
            $table->decimal('quantity', 10, 2);
            $table->dateTime('txn_datetime');
            $table->timestamps();
            $table->index(['miller_id', 'wholesaler_id']);
            $table->index('txn_datetime');
        });

        Schema::create('wholesaler_retailer_txn', function (Blueprint $table) {
            $table->id('txn_id');
            $table->foreignId('wholesaler_id')->constrained('wholesalers')->cascadeOnDelete();
            $table->foreignId('retailer_id')->constrained('retailers')->cascadeOnDelete();
            $table->string('rice_type', 50);
            $table->decimal('quantity', 10, 2);
            $table->dateTime('txn_datetime');
            $table->timestamps();
            $table->index(['wholesaler_id', 'retailer_id']);
            $table->index('txn_datetime');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('wholesaler_retailer_txn');
        Schema::dropIfExists('miller_wholesaler_txn');
        Schema::dropIfExists('collector_miller_txn');
        Schema::dropIfExists('farmer_collector_txn');
    }
};
