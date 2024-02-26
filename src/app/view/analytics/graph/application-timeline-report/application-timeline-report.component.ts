import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-application-timeline-report',
  templateUrl: './application-timeline-report.component.html',
  styleUrls: ['./application-timeline-report.component.css']
})
export class ApplicationTimelineReportComponent implements OnInit {

  @ViewChild('myChart') private chartRef!: ElementRef;
  private chart!: Chart
  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    this.createChart()
  }
  createChart() {
    const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5']; // Replace with your actual date labels
    const data1 = [10, 20, 15, 30, 25]; // Replace with your first data series
    const data2 = [15, 25, 20, 35, 30]; // Replace with your second data series
  
    // Create the line chart with two datasets
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Line 1',
            data: data1,
            borderColor: 'blue', // Change the line color as needed
            fill: false
          },
          {
            label: 'Line 2',
            data: data2,
            borderColor: 'red', // Change the line color as needed
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  

  openFilter(){
    const dialogRef = this.dialog.open(ApplicationTimelineReportComponent, {
      width: '50%',
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    }); 
  }
  

}
