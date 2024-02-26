import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-lead-funnel-by-status',
  templateUrl: './lead-funnel-by-status.component.html',
  styleUrls: ['./lead-funnel-by-status.component.css']
})
export class LeadFunnelByStatusComponent implements OnInit {
  @ViewChild('myChart') private chartRef!: ElementRef;
  private chart!: Chart
  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    this.createChart()
  }
  createChart() {
    const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
    const data = [12, 19, 3, 5, 2, 3];
    const backgroundColor = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'];
  
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
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y', // Set the axis to be horizontal
        scales: {
          x: {
            beginAtZero:true
          }
        }
      }
    });
  }
  openFilter(){
    const dialogRef = this.dialog.open(LeadFunnelByStatusComponent, {
      width: '50%',
    });
    dialogRef.disableClose=true
  
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    }); 
  }
  
  
  
}
