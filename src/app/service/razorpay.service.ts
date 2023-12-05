import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {
  private razorpayApiKey = 'rzp_test_8QJuav3Zg2fxgz'; // Replace with your API key

  constructor(private http: HttpClient) {}

  createOrder(amount: number): Promise<any> {
    const data = {
      amount: amount * 100, // Razorpay accepts amount in paise
      currency: 'INR', // Change currency if required
      receipt: 'receipt#1', // Replace with your receipt details
      payment_capture: 1
    };

    return this.http.post<any>('https://api.razorpay.com/v1/orders', data, 
    // {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Basic ' + btoa(this.razorpayApiKey + ':')
    //   }
   // )}
    ).toPromise();
  }

  capturePayment(paymentId: string, amount: number): Promise<any> {
    const data = {
      amount: amount * 100 // Razorpay accepts amount in paise
    };

    return this.http.post<any>(`https://api.razorpay.com/v1/payments/${paymentId}/capture`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.razorpayApiKey + ':')
      })
    }).toPromise();
  }
}
