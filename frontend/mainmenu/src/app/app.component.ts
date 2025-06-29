import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavMenuComponent } from "./componentes/sidenav-menu/sidenav-menu.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavMenuComponent,   MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Auditoria';

 
}
