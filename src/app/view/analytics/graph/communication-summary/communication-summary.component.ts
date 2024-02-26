import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-communication-summary',
  templateUrl: './communication-summary.component.html',
  styleUrls: ['./communication-summary.component.css']
})
export class CommunicationSummaryComponent implements OnInit {

  @ViewChild('myChart') private chartRef!: ElementRef;
  private chart!: Chart
  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    this.createChart()
  }
  createChart() {
    const data = [35, 65]; // Replace with your data values
    const labels = ['Data A', 'Data B']; // Replace with labels for your data

    const chartConfig: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: ['blue', 'red'], // Colors for each dataset
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    };

    this.chart = new Chart(this.chartRef.nativeElement, chartConfig);
  }
  

  openFilter(){
    const dialogRef = this.dialog.open(CommunicationSummaryComponent, {
      width: '50%',
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    }); 
  }
  

}
