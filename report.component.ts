import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Subject } from 'rxjs';
import  { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatInput } from '@angular/material';
//import { Moment } from 'moment';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

const moment:any = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM-YYYY',
  },
  display: {
    dateInput: 'MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ReportComponent implements OnInit {

  reportI$: any [];
  reportE$: any [];
  opening$: string;
  date = new FormControl(moment());

  constructor(private data: DataService) { }

  ngOnInit() {
  }

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normlizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  value: Date;
   searchV(values: Date){
     this.value = values;

     this.data.reportTotal(values).subscribe(
      (data: any) => {this.reportI$ = data.data, this.reportE$ = data.expense, this.opening$ = data.finalAmount;},
      err => console.log(err),
      () => console.log('done loading'),
    );
   }

}
