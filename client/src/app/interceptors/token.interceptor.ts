import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  //Un interceptor permite inteceder en las peticiones http
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    //Despues de recibir el req se ejecutara un next.handle para mandar el req y seguir con el proceso
    return next.handle(request).pipe<any>(//El pipe nos permite ejecutar opciones en el proceso de tuberia
      catchError((err)=>{
        
        if(err || err.status == 401)
        {
          localStorage.clear();
          return this.router.navigate(['/login']);
        }
        else
        {
          return next.handle(request);
        }

      })
    );
  }

  //Se debe agregar en el modulo principal y providers "{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}" multi significa de se pueen crear varios interceptors sin sobrescribir ninguno

}
