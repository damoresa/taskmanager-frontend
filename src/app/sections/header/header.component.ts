import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthEvent } from './../../common/auth/auth.event';
import { AuthComponent } from './../../common/auth/auth.component';
import { AuthService } from './../../common/auth/auth.service';

// TODO: Notification toasts

@Component({
    selector: 'header-component',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy, OnInit {
    
    authenticated: boolean = false;
    username: string;

    @ViewChild(AuthComponent) authComponent: AuthComponent;
    private authSubscription;
    
    constructor(private authService: AuthService, private router: Router) {}
    
    ngOnInit() {
        this.authSubscription = this.authService.sessionStatus().subscribe(
            (authEvent: AuthEvent) => {
                // Whenever we receive a correct authentication it means the login modal was up.
                if (authEvent.authed) {
                    this.username = authEvent.username;
                    this.authComponent.hideLogin();
                } else {
                    this.username = '';
                }

                this.authenticated = authEvent.authed;
            },
            (error) => {
                console.log('# HEADER # Error on the authentication status subscription');
            }
        );
    }

    ngOnDestroy() {
		if (this.authSubscription) {
			this.authSubscription.unsubscribe();
		}
    }

    login() {
        this.authComponent.showLogin();
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }
}
