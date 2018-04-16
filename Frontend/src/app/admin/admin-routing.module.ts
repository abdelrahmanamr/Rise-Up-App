import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'viewusers',
                loadChildren: './viewusers/viewusers.module#ViewUsersModule'
            },
            
            {
                path: 'profile/:id',
                loadChildren: './profile/profile.module#ProfileModule'
            },
            {
                path: 'addcompany',
                loadChildren: './addcompany/addcompany.module#AddCompanyModule'
            },
            {
                path: 'edittags',
                loadChildren: './edittags/edittags.module#EdittagsModule'
            },
            {
                path: 'controlpanel',
                loadChildren: './controlpanel/controlpanel.module#ControlPanelModule'
            },
            {
                path: '',
                redirectTo: 'controlpanel',
                pathMatch: 'full'
            }
            

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class AdminRoutingModule {}