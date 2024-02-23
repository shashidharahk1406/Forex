import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-monthly-enrollments',
  templateUrl: './monthly-enrollments.component.html',
  styleUrls: ['./monthly-enrollments.component.css']
})
export class MonthlyEnrollmentsComponent implements OnInit {

  @ViewChild('myChart') private chartRef!: ElementRef;
  private chart!: Chart
  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    this.createChart()
  }
  createChart() {
    const labels = ['Red'];
    const data = [12];
    const backgroundColor = ['red'];
  
    // Create an array of objects to hold the data and labels
    const chartData = labels.map((label, index) => ({
      label: label,
      data: data[index],
      backgroundColor: backgroundColor[index],
    }));
  
    // Sort the data in descending order
    chartData.sort((a, b) => b.data - a.data);
  
    // Extract the sorted data and labels
    const sortedLabels = chartData.map(item => item.label);
    const sortedData = chartData.map(item => item.data);
    const sortedBackgroundColor = chartData.map(item => item.backgroundColor);
  
    // Create the chart
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar', // Use 'bar' type
      data: {
        labels: sortedLabels,
        datasets: [{
          label: '# of Votes',
          data: sortedData,
          backgroundColor: sortedBackgroundColor,
          borderColor: sortedBackgroundColor,
          borderWidth: 0.5,
          barThickness:50
        }]
      },
      options: {
        indexAxis: 'y', // Set the axis to be horizontal
        scales: {
          x:
            {
              beginAtZero: true
            }
          
        }
      }
    });
  }
  openFilter(){
    const dialogRef = this.dialog.open(MonthlyEnrollmentsComponent, {
      width: '50%',
    });
    dialogRef.disableClose=true
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    }); 
  }
}