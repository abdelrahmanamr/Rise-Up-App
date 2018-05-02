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
                path: 'viewreports',
                loadChildren: './viewreports/viewreports.module#ViewReportsModule'
            },
            {
                path: 'viewActivity',
                loadChildren: './viewActivity/viewActivity.module#ViewActivityModule'
            },
            {
                path: 'viewapplications',
                loadChildren: './viewapplications/viewapplications.module#ViewApplicationsModule'
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