import { Routes } from '@angular/router';
import { LogInComponent } from './componentes/log-in/log-in.component';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { UsuariosTablaComponent } from './componentes/usuarios-tabla/usuarios-tabla.component';
import { EmpleadosComponent } from './componentes/empleados/empleados.component';
import { InventarioPoliticasComponent } from './componentes/inventario-politicas/inventario-politicas.component';

export const routes: Routes = [
    
    { path: 'login', component: LogInComponent},
    
    {
        path:'',
        component: MainLayoutComponent,
        children: [
            { path:'principal', component: PrincipalComponent},
            { path:'usuarios', component: UsuariosTablaComponent},
            { path:'empleados', component: EmpleadosComponent},
            { path:'inventario', component: InventarioPoliticasComponent},
            
        ]
    },
    {path: '**', redirectTo: 'login'}
];
