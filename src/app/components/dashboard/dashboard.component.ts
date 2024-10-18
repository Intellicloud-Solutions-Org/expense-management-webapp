import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { Chart, registerables} from 'chart.js';
import { take } from 'rxjs/operators';
import { DashboardService } from '../../services/dashboard.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { AuthService } from '/Project/expense-management-webapp/src/app/services/auth/auth.service';


Chart.register(...registerables)



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, FormsModule, ConfirmdialogComponent  ],
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

userRole: string | null = null; // Store user role


@ViewChild(ConfirmdialogComponent) dialog!: ConfirmdialogComponent;

currentItem: any;
selectedItems: any[] = [];

SelectAll(event: any) {
  const checked = event.target.checked;
  this.teamApprovalRequestsData.forEach((item) => (item.selected = checked));
  this.updateSelectedItems();
}
updateSelectedItems() {
  this.selectedItems = this.teamApprovalRequestsData.filter(item => item.selected);
  console.log('Selected Items:', this.selectedItems); // Debugging statement to check selected items
}

approveItem(item: any): void {

  if (!item || !item.selected) {
    this.showNoSelectionDialog('No Selection', 'Please select an item to approve.');
    return;
  }

  this.currentItem = item;
  this.dialog.showConfirmation('Approve Item', `Approved Email has been sent!`);
  this.dialog.confirmed.pipe(take(1)).subscribe(() => {
  item.pendingApprovals = Math.max(item.pendingApprovals - 1, 0);
    console.log('Item approved:', item);
    });
}

rejectItem(item: any): void {
  

  if (!item || !item.selected) {
    this.showNoSelectionDialog('No Selection', 'Please select an item to reject.');
    return;
  }

  this.currentItem = item;
  this.dialog.showConfirmation('Reject Item', `Reject Email has been sent!`);
  item.pendingApprovals = Math.max(item.pendingApprovals - 1, 0);
  this.dialog.confirmed.pipe(take(1)).subscribe(() => {
    console.log('Item rejected:', item);
    });
}

approveSelected(): void {
  this.updateSelectedItems(); 

  if (this.selectedItems.length === 0) {
    this.showNoSelectionDialog('No Selection', 'No items selected to approve.');
    return;
  }

  this.dialog.showConfirmation('Approve Selected', 'Approved Email has been sent for the selected items!');
  this.dialog.confirmed.pipe(take(1)).subscribe(() => {
    console.log('Selected items approved:', this.selectedItems);
  });
}

rejectSelected(): void {
  this.updateSelectedItems(); 

  if (this.selectedItems.length === 0) {
    this.showNoSelectionDialog('No Selection', 'No items selected to reject.');
    return;
  }

  this.dialog.showConfirmation('Reject Selected', 'Reject Email has been sent for the selected items!');
  this.dialog.confirmed.pipe(take(1)).subscribe(() => {
    console.log('Selected items rejected:', this.selectedItems);
    }); 
}

showNoSelectionDialog(title: string, message: string): void {
  this.dialog.showConfirmation(title, message);

  this.dialog.confirmed.pipe(take(1)).subscribe(() => {
    console.log('No selection dialog confirmed');
  });
}

tableData: Array<{ empName: string, expenseType: string, amount: number, submissionDate: Date, receipt: string, Approval: string, comments: string, selected: boolean }> = [];
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
