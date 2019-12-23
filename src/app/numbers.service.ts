import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { tap, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NumbersService {

  private _factSubject:Subject<string> = new Subject<string>();
  constructor(private http:HttpClient) { }

  getDateFact(date:Date):void{
    const day:number = date.getDate();
    const month:number = date.getMonth()+1;

    const numbersAPIUrl:string = `${environment.numbersAPI}${month}/${day}/date`
    
    this.http.get(numbersAPIUrl, { responseType: 'text' }).subscribe(fact=>{
      this._factSubject.next(fact)
    }
    )
  }

  get factSubjact():Observable<string>{
    return this._factSubject.asObservable();
  }
}
