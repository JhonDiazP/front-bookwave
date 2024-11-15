import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { NotfoundComponent } from './views/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AppTopBarPublicComponent } from './layout/app.topbar.public.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        component: AppTopBarPublicComponent,
        loadChildren: () => import('../app/views/components/auth/auth.module')
        .then(m => m.AuthModule)
    },
    {
        path: 'pages',
        component: AppLayoutComponent,
        loadChildren: () => import('../app/views/components/pages/pages.module')
        .then(m => m.PagesModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'public',
        component: AppLayoutComponent,
        children: [
            {
                path: 'users', loadChildren: () => import('./views/public/users/users.module').then(m => m.UsersModule)
            }
        ]
    },
    {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
    { path: 'pages/notfound', component: NotfoundComponent},
    { path: '**', redirectTo: 'pages/notfound'},
];

const config: ExtraOptions = {
    useHash: false,
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
