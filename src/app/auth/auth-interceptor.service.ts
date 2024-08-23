import {inject} from "@angular/core";
import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {exhaustMap, take} from "rxjs";


export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);

  return authService.user.pipe(
    take(1),
    exhaustMap(user => {
      if (!user) {
        let modifiedReq = req.clone({
          headers: req.headers
            .append('Access-Control-Allow-Origin','*')});
        return next(modifiedReq);
      }
      let modifiedReq = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${user.jwt}`)
          .append('Access-Control-Allow-Origin','*')});
      console.log(req.body)
      return next(modifiedReq);
    })
  );
};


