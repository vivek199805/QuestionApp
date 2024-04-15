import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor() {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Beazer ${localStorage.getItem('token')}`
		})
    const cloneReq = req.clone({ headers });
    return next.handle(cloneReq);

    // return new Observable(observer => {
    //   const subscription = next.handle(cloneReq).subscribe(event => {
    //         if (event instanceof HttpResponse) {
    //           if (event.body.statuscode && event.body.statuscode !== 404) {
    //             observer.next(event);
    //           }
    //           else {
    //             Swal.fire({
    //               icon: 'error',
    //               title: event.body.message
    //             })
    //             // this._LogoutService.logout();
    //           }
    //         }
    //       },
    //       err => {
    //         observer.error(err);
    //       },
    //       () => {
    //         observer.complete();
    //       });
    //   return () => {
    //     subscription.unsubscribe();
    //   };
    // });
  }

}
