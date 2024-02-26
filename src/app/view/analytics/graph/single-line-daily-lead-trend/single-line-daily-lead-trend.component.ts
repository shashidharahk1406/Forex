import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-single-line-daily-lead-trend',
  templateUrl: './single-line-daily-lead-trend.component.html',
  styleUrls: ['./single-line-daily-lead-trend.component.css']
})
export class SingleLineDailyLeadTrendComponent implements OnInit {

  
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
    const data = [10, 20, 15, 30, 25]; // Replace with your actual data values
  
    // Create the line chart
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Daily Trend',
            data: data,
            borderColor: 'blue', // Change the line color as needed
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
    const dialogRef = this.dialog.open(SingleLineDailyLeadTrendComponent, {
      width: '50%',
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    }); 
  }
  

}
