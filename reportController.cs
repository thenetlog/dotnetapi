using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;


namespace dotnet2_1WebAPI
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : BaseController
    {
        private AppDb _objdb;

        public ReportController(AppDb DB)
        {
            _objdb = DB;
        }
        
        [HttpGet("GetReport/{FromMonth}/", Name = "GetReport")]
        public dynamic GetReport(DateTime FromMonth)
        {
            /*DateTime FromDate = new DateTime();
            DateTime ToDate = new DateTime();
            FromDate = fromDate;
            ToDate = toDate;*/
            DateTime EndMonth = FromMonth.AddMonths(1);
            dynamic objresponse = new { data = 0 , data1 = 0, data2 = 0};

            //Income current
            var income = (from main in _objdb.Income
                             where main.TransactionDate >= FromMonth && main.TransactionDate < EndMonth
                             select main);
            
            var incomeAmount = (from i in income select i.Amount).ToList();

            decimal totalIncome = 0;
            foreach (var iAmount in incomeAmount)
            {
                totalIncome += iAmount;
            }
            

            //Expense current
            var expense = (from main in _objdb.Expense
                                where main.TransactionDate >= FromMonth && main.TransactionDate < EndMonth
                                select main);

            var expenseAmount = (from e in expense select e.Amount).ToList();

            decimal totalExpense = 0;
            foreach (var eAmount in expenseAmount)
            {
                totalExpense += eAmount;
            }

            //final current
            var finalAmount = totalIncome - totalExpense;
            
            objresponse = new { data = income, expense, finalAmount };
            
            return objresponse;
        }
  }
}
