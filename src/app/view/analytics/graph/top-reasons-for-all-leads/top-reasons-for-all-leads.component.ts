import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-top-reasons-for-all-leads',
  templateUrl: './top-reasons-for-all-leads.component.html',
  styleUrls: ['./top-reasons-for-all-leads.component.css']
})
export class TopReasonsForAllLeadsComponent implements OnInit {

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
          borderWidth: 0.5,
          barThickness:50
        }]
      },
      options: {}
    });
  }
  openFilter(){
    const dialogRef = this.dialog.open(TopReasonsForAllLeadsComponent, {
      width: '50%',
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      //console.log('The dialog was closed');
    }); 
  }
  

}
