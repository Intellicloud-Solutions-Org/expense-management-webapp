import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { Chart, registerables} from 'chart.js';
import { take } from 'rxjs/operators';
import { DashboardService } from '../../services/dashboard.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, FormsModule, ConfirmdialogComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

  data1: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{
      data: []
    }]
  };

  chartOptions1: ChartOptions<'doughnut'> = {
    responsive: true,
    aspectRatio: 0,
    cutout: '60%', // Cutout 
    layout: {
      padding: 2
    },
    plugins: {
      legend: {
        display: true, 
        position: 'right',
        labels: {
          font: {
            size: 12 // Labels Font Size
          }
        }
      },
      title: {
      display: true,
      text: 'Category-Wise Expense Distribution', // Title
      font: {
        size: 18 // Title font size
      },
      align: 'start' // Aligns the title to the left
    }
    },
  };

  data2: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  chartOptions2: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    },
    layout: {
      padding: 2
        },
    plugins: {
      legend: {
        display: true, position: 'top',
        labels: {
          font: {
            size: 15 //Increase the legend font size
          }
        }
    },
    title: {
      display: true,
      text: 'Quaterly Expense Distribution', // Title
      font: {
        size: 18// Title font size
      },
      align: 'start' // Aligns the title to the left
    }
  }
};

ableData: Array<{ empName: string, expenseType: string, amount: number, submissionDate: Date, receipt: string, Approval: string, comments: string, selected: boolean }> = [];
employeeStatusData: Array<{expenseType: string, amount: number, Approval: string}> = [];
teamApprovalRequestsData: Array<{ empName: string, expenseType: string, amount: number, submissionDate: Date, receipt: string, comments: string, selected: boolean}> = [];


  usedBudget: number = 0;
  recentExpenses: number = 0;
  pendingApprovals: number = 0;


  constructor(private dashboardService: DashboardService, private authService: AuthService) {}

  ngOnInit() {
    this.dashboardService.getDashboardData().subscribe(data => {
      this.data1 = data.data1;
      this.data2 = data.data2;
  

      this.usedBudget = 456
      this.recentExpenses = 12345;  
      this.pendingApprovals = 567;

      // Apply styles for doughnut chart
      this.data1.datasets[0].backgroundColor = ["#10c4b5", "#005562", "#0e8174", "#6eba8c"];
      this.data1.datasets[0].borderColor = ["#0e8174", "#10c4b5", "#6eba8c", "#005562"];
      

      // Apply styles for bar chart
      this.data2.datasets.forEach(dataset => {
        switch (dataset.label) {
          case 'Travel':
            dataset.backgroundColor = "#10c4b5";
            break;
          case 'Team Activities':
            dataset.backgroundColor = "#005562";
            break;
          case 'Professional Development':
            dataset.backgroundColor = "#0e8174";
            break;
          case 'Bills':
            dataset.backgroundColor = "#6eba8c";
            break;
        }
      });
    
    this.dashboardService.getTableData().subscribe(data => {
      this.employeeStatusData = data;
    });

    this.dashboardService.getRequestTableData().subscribe(data => {
      this.teamApprovalRequestsData = data;
    });
  });

}
}



