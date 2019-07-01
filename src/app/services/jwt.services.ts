import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Token } from '@app/models/token.model';
import { Logger } from '@app/core/logger.service';

@Injectable()
export class JWTService {
  constructor(private httpClient: HttpClient) {}

  getToken(): Observable<Token> {
    const log = new Logger('JWTService');

    log.debug('Calling getToken');
    // const serviceUrl = `/Authorize`;
    const serviceUrl = environment.oAuthServerUrl + '/Authorize';
    return this.httpClient.get<any>(serviceUrl);
  }

  login(loginInfo: any): Observable<Token> {
    const log = new Logger('JWTService');

    log.debug('Calling getToken');
    // const serviceUrl = `/Authorize`;
    const serviceUrl = environment.oAuthServerUrl + '/api-token-auth';
    return this.httpClient.post<any>(serviceUrl, loginInfo);
  }
}
