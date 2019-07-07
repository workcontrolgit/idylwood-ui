import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
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
  jwt: any;
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

    const token$ = this.jwtService.login(logininfo);
    // log.debug('login ' + JSON.stringify(this.login$));

    token$.subscribe(
      res => {
        this.jwt = res;
        log.debug('jwt value: ' + JSON.stringify(this.jwt));
        this.token = this.jwt.token;
        log.debug('token value: ' + JSON.stringify(this.token));
      },
      error => {
        this.error = 'Error detail: ' + JSON.stringify(error);
        //log.debug(this.error);
        // return of(this.datastorage);
      }
    );

    if (this.error) {
      log.debug('failed login validation');
      log.debug('this.error value: ' + this.error);
    } else {
      log.debug('passed login validation');
      log.debug('this.error value: ' + this.error);
      log.debug('set datastorage token value: ' + JSON.stringify(this.token));
      this.datastorage = {
        username: context.username,
        token: this.token
      };
      log.debug('datastorage value: ' + JSON.stringify(this.datastorage));
      // set application token
      this.credentialsService.setCredentials(this.datastorage, context.remember);
    }
    log.debug('return datastorage: ' + JSON.stringify(this.datastorage));
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
