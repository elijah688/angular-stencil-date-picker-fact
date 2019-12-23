import { Component, Input, SimpleChanges, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { NumbersService } from './numbers.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

 
  private numSub:Subscription = new Subscription();
  fact:string;
  date:Date;

  constructor(private numbServ:NumbersService){
  }

  ngOnInit(): void {
    if(this.date){
      this.numbServ.getDateFact(this.date);
    }
    this.numSub = this.numbServ.factSubjact.subscribe(fact=>{
      this.fact = fact;
    });
  }


  ngOnDestroy(): void {
    this.numSub.unsubscribe()    
  }

  getFact(d:Date):void{
    const date:Date = (new Date(d['detail']))
    this.numbServ.getDateFact(date)
  }
}
