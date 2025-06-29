import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    importProvidersFrom(MatDialogModule),
    ...(appConfig.providers || []),
    provideHttpClient(), // Configura HttpClient
    
  ]
}).catch((err) => console.error(err));
