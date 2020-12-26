import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';

import { StorageService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private store: StorageService,
    electronService: ElectronService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron)
      console.log(process.env);
    else
      console.log('Running in browser');
  }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      // User has not provided access token
      // Redirect to authorization page
      if (!this.store.has("oauth_token")) {
        this.router.navigateByUrl("/auth");
      }
    });
  }
}
