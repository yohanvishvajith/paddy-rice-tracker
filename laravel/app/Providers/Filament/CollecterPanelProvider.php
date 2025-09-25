<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Navigation\MenuItem;
use Filament\Support\Colors\Color;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class CollecterPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->id('collecter')
            ->path('collecter')
            ->login()
            ->userMenuItems([
                'switch-to-miller' => MenuItem::make()
                    ->label('Miller Panel')
                    ->icon('heroicon-o-shield-check')
                    ->url(fn (): string => route('filament.miller.pages.dashboard')),
                'switch-to-wholesaler' => MenuItem::make()
                    ->label('Wholesaler Panel')
                    ->icon('heroicon-o-building-storefront')
                    ->url(fn (): string => route('filament.wholesaler.pages.dashboard')),
            ])
            ->colors([
                'primary' => Color::Indigo,
            ])
            ->discoverPages(in: app_path('Filament/Collecter/Pages'), for: 'App\\Filament\\Collecter\\Pages')
            ->discoverWidgets(in: app_path('Filament/Collecter/Widgets'), for: 'App\\Filament\\Collecter\\Widgets')
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
