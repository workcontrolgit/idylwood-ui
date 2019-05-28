import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';
import { JWTService } from '@app/services/jwt.services';
import { Logger } from '@app/core/logger.service';

const log = new Logger('AuthenticationService');

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  accessToken: any;
  token: any;
  error: string;
  datastorage: any;

  constructor(private credentialsService: CredentialsService, private jwtService: JWTService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */

  login(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    const logininfo = {
      email: context.username,
      password: context.password
    };

    this.jwtService.login(logininfo).subscribe(
      data => {
        this.accessToken = data;
        log.debug('accessToken ' + this.accessToken);

        this.token = this.accessToken.access_token;
        log.debug('token befor ' + this.accessToken.access_token);
        this.datastorage = {
          username: context.username,
          token: this.token
        };
        log.debug('token after ' + this.token);
        this.credentialsService.setCredentials(this.datastorage, context.remember);
      },
      error => {
        this.error = 'Error detail: ' + JSON.stringify(error);
      }
    );
    return of(this.datastorage);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
