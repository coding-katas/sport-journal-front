import { HttpInterceptorFn } from '@angular/common/http';

export const telemetryInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};


@Injectable()
export class TelemetryInterceptor implements HttpInterceptor {
 intercept(
 request: HttpRequest<unknown>,
 next: HttpHandler
 ): Observable<HttpEvent<unknown>> {
 if (request.headers.get('X-TELEMETRY') !== 'true') {
 return next.handle(request);
 }
 const started = Date.now();
 return next.handle(request).pipe(
 finalize(() => {
 const elapsed = Date.now() - started;
 const message = `${request.method} "${request.urlWithParams}" in ${elapsed}
ms.`;
 console.log(message);
 })
 );
 }
}
