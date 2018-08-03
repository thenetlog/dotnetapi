<h1>Search</h1>

<div>
  <mat-form-field>
    <input matInput [matDatepicker]="dp" placeholder="Month and Year" [formControl]="date" #box>
    <mat-datepicker-toggle matSuffix [for]="dp"></mat-datepicker-toggle>
    <mat-datepicker #dp
                    startView="multi-year"
                    (yearSelected)="chosenYearHandler($event)"
                    (monthSelected)="chosenMonthHandler($event, dp)"
                    panelClass="example-month-picker">
    </mat-datepicker>
  </mat-form-field>
</div>
<p>{{ value }}</p>
<button (click)="searchV(box.value)">Search</button>

<p style="display: center">OpeingAmount = {{ opening$ }}</p>
<table style="display: inline-block" id="t01">
  <thead>
    <th>IncomeID</th>
    <th>TransactionDate</th>
    <th>Amount</th>
  </thead>
  <tbody>
    <tr *ngFor="let inc of reportI$">
      <td>{{ inc.IncomeID }}</td>
      <td>{{ inc.TransactionDate | date }}</td>
      <td>{{ inc.Amount }}</td>
    </tr>
  </tbody>
</table>
<table id="t01" class="t01"> 
  <thead>
    <th>ExpenseID</th>
    <th>TransactionDate</th>
    <th>Amount</th>
  </thead>
  <tbody>
    <tr *ngFor="let exp of reportE$">
      <td>{{ exp.ExpenseID }}</td>
      <td>{{ exp.TransactionDate | date }}</td>
      <td>{{ exp.Amount }}</td>
    </tr>
  </tbody>
</table>



<!-- <input type="text" (keydown)="search($event)" placeholder="search total"> -->

<!-- <label>Search: <input ng-model="searchText"></label>
<table id="searchTextResults">
  <tr><th>Name</th><th>Phone</th></tr>
  <tr ng-repeat="friend in friends | filter:searchText">
    <td>{{friend.name}}</td>
    <td>{{friend.phone}}</td>
  </tr>
</table>
<hr>
<label>Any: <input ng-model="search.$"></label> <br>
<label>Name only <input ng-model="search.name"></label><br>
<label>Phone only <input ng-model="search.phone"></label><br>
<label>Equality <input type="checkbox" ng-model="strict"></label><br>
<table id="searchObjResults">
  <tr><th>Name</th><th>Phone</th></tr>
  <tr ng-repeat="friendObj in friends | filter:search:strict">
    <td>{{friendObj.name}}</td>
    <td>{{friendObj.phone}}</td>
  </tr>
</table> -->
