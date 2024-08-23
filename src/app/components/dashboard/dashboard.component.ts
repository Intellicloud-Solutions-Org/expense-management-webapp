import { Component, OnInit} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { Chart, registerables} from 'chart.js';
import { DashboardService } from '../../services/dashboard.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


Chart.register(...registerables)



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, FormsModule  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

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

tableData: Array<{ empName: string, expenseType: string, amount: number, submissionDate: Date, receipt: string, pendingApprovals: number, comments: string, selected: boolean }> = [];

  usedBudget: number = 0;
  recentExpenses: number = 0;
  pendingApprovals: number = 0;


  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getDashboardData().subscribe(data => {
      this.data1 = data.data1;
      this.data2 = data.data2;
      this.tableData = data.tableData;

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
        this.tableData = data;
      });
    });
  }

  SelectAll(event: any) {
    const checked = event.target.checked;
    this.tableData.forEach(item => item.selected = checked);
  }
      approveItem(item: any) {
        item.pendingApprovals = Math.max(item.pendingApprovals - 1, 0);
        console.log('Item approved:', item);
      }

      rejectItem(item: any) {
        // Simply mark the item as rejected
        item.pendingApprovals = Math.max(item.pendingApprovals - 1, 0);
        console.log('Item rejected:', item);
      }
    
      approveSelected() {
        const selectedItems = this.tableData.filter(item => item.selected);
        selectedItems.forEach(item => this.approveItem(item));
        
      }
      // Method to reject selected items
      rejectSelected() {
        const selectedItems = this.tableData.filter(item => item.selected);
        selectedItems.forEach(item => this.rejectItem(item));
        
      }
    }
  



    /*data2: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Travel',
        data: [100, 950, 500, 105, 450, 950, 260, 560, 100, 950, 105, 150],
        backgroundColor: '#10c4b5'
      },
      {
        label: 'Team Activities',
        data: [200, 220, 210, 230, 220, 210, 220, 230, 210, 220, 230, 220],
        backgroundColor: '#005562'
      },
      {
        label: 'Professional Development',
        data: [300, 320, 310, 330, 320, 310, 320, 330, 310, 320, 330, 320],
        backgroundColor: '#0e8174'
      },
      {
        label: 'Bills',
        data: [150, 160, 170, 180, 170, 160, 170, 180, 170, 160, 170, 180],
        backgroundColor: '#6eba8c'
      }
    ]
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
    plugins: {
      legend: {
        display: true
      }
    },
    layout: {
      padding: 10
    }
  };

      

      data1: ChartData<'doughnut'> = {
        labels: ['Travel', 'Team Activities', 'Professional Development', 'Bills'],
        datasets: [{
          data: [1000, 200, 300, 150],
          backgroundColor: ['#10c4b5','#005562','#0e8174','#6eba8c'],
          borderColor: ['#0e8174', '#10c4b5', '#6eba8c', '#005562'],
          borderWidth: 1
        }]
      };
        chartOptions1: ChartOptions<'doughnut'> = {
          cutout: '50%',  // Inner size as percentage
          layout: {
            padding: 10
        },
      }
  }
      */