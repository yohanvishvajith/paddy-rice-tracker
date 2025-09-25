<?php

namespace App\Filament\Collecter\Pages;

use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    public static function getNavigationLabel(): string
    {
        return 'Dashboard';
    }

    public static function getNavigationIcon(): ?string
    {
        return 'heroicon-o-home';
    }
}
