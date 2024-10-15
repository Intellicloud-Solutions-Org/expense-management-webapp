import { Component, OnInit  } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from "chart.js";
import { Chart, registerables} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AdmindashboardService  } from '../../services/admindashboard.service';
import { CommonModule } from '@angular/common'; 

Chart.register(...registerables)

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  // Line
  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [{
      data: [],
      label: '',
      fill: true,
      backgroundColor: "#10c4b5", 
      borderColor: "#0e8174" 
    }]
  };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    layout: {
      padding: 2
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 12 
          }
        }
      },
      title: {
        display: true,
        text: 'Monthly Data',
        font: {
          size: 18
        },
        align:'start'
      }
    }
  };


  // Pie
  pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    aspectRatio: 0,
    layout: {
      padding: 2
    },
    plugins: {
      legend: {
        display: true,
        position: 'right'
      },
      title: {
        display: true,
        text: 'Category-Wise Expense Distribution',
        font: {
          size: 18
        },
        align: 'start'
      }
    }
  };

  totalOfficeExpenses= 456;
  totalInventoryValue= 78;
  numberOfVendors= 7;

  tableData: any[] = [];

  constructor(private admindashboardService: AdmindashboardService) { }

  ngOnInit(): void {
    this.admindashboardService.getLineChartData().subscribe(data => {
      this.lineChartData.labels = data.labels;
      this.lineChartData.datasets[0].data = data.datasets[0].data;
      this.lineChartData.datasets[0].label = data.datasets[0].label;

    });

    this.admindashboardService.getPieChartData().subscribe(data => {
      this.pieChartData.labels = data.labels;
      this.pieChartData.datasets[0].data = data.datasets[0].data;
      this.pieChartData.datasets[0].backgroundColor = data.datasets[0].backgroundColor;
    });

    this.admindashboardService.getEmployeeData().subscribe((data: any[]) => {
      this.tableData = data;
    });

    this.admindashboardService.getDashboardData().subscribe(data => {
      this.totalOfficeExpenses = data.totalOfficeExpenses;
      this.totalInventoryValue = data.totalInventoryValue;
      this.numberOfVendors = data.numberOfVendors;
    });
}
}