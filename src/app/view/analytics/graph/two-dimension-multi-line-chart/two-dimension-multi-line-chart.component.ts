import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-two-dimension-multi-line-chart',
  templateUrl: './two-dimension-multi-line-chart.component.html',
  styleUrls: ['./two-dimension-multi-line-chart.component.css']
})
export class TwoDimensionMultiLineChartComponent implements OnInit {

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
    const data = [
      [10, 20, 15, 30, 25], // Data for Line 1
      [15, 25, 20, 35, 30], // Data for Line 2
      [8, 18, 13, 28, 22], // Data for Line 3
      [12, 22, 17, 32, 27], // Data for Line 4
      [14, 24, 19, 34, 29]  // Data for Line 5
    ];
  
    // Create the line chart with five datasets
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: data.map((lineData, index) => ({
          label: `Line ${index + 1}`,
          data: lineData,
          borderColor: getRandomColor(), // Function to generate different colors
          fill: false
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y:{
            beginAtZero: true
          }
           
          
        }
      }
    });
  
    function getRandomColor() {
      // Generate a random color in hexadecimal format
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  }
  

  openFilter(){
    const dialogRef = this.dialog.open(TwoDimensionMultiLineChartComponent, {
      width: '50%',
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    }); 
  }
}