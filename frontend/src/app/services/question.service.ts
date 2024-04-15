import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  baseURL: string = 'http://localhost:3000'

	getAllQuestion(token?:any){
		// const headers = new HttpHeaders({
		// 	'Content-Type': 'application/json',
		// 	'Authorization': `Beazer ${token}`
		// })
		return this.http.get(`${this.baseURL}/all-question`)
	}

	createQuestion(data:any, token:any){
		return this.http.post(`${this.baseURL}/create-question`, data)
	}

	solveQuestion(qId:any, a:any, token?:any){
		return this.http.get(`${this.baseURL}/solve-question/${qId}/${a}`)
	}

	infoQuestion(id:any, token?:any){
		return this.http.get(`${this.baseURL}/info-question/${id}`)
	}
}
