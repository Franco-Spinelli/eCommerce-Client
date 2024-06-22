import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.modules.js';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
