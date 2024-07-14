import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileLoaderService {

    constructor(private http: HttpClient) { }

    getFileContents(url: string): Observable<string | null> {
        return this.http.get(url, { responseType: 'text' })
            .pipe(
                map((res: string) => {
                    return res;
                }),
                catchError((err) => {
                    return of(null);
                })
            );
    }

}