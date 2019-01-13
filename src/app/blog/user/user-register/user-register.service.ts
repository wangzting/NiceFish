import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, Response, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class UserRegisterService {
    public userRegisterURL = "mock-data/user-register-mock.json";
    public testEmailURL = "";
    public subject: Subject<any> = new Subject<any>();

    constructor(public http: Http) {
    }

    public get currentUser(): Observable<any> {
        return this.subject.asObservable();
    }

    public register(user: any) {
        console.log(user);

        //向后台post数据的写法如下
        // let data = new URLSearchParams();
        // data.append('email', user.email);
        // data.append('password', user.password);
        // return this.http.post(this.userRegisterURL,data);

        return this.http
            .get(this.userRegisterURL)
            .pipe(map((response: Response) => {
                let user = response.json();
                localStorage.setItem("currentUser", JSON.stringify(user));
                this.subject.next(user);
            }));
    }

    public testEmail(email: string) {
        return this.http.get(this.testEmailURL)
            .pipe(map((response: Response) => response.json()));
    }
}