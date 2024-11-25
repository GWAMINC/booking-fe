import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { ReviewDto } from "../../../model/review.model";
import { ReviewCreate } from "../../../model/review/create.model";
import { ReviewUpdate } from "../../../model/review/update.model";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    private apiUrl = "http://localhost:9000/api/user-review"

    constructor(private http: HttpClient) {}

    getReviews(): Observable<ReviewDto[]> {
        return this.http.get<ReviewDto[]>(`${this.apiUrl}`);
    }
    
    createReviews(reviewCreate: ReviewCreate): Observable<ReviewDto> {
        return this.http.post<ReviewDto>(`${this.apiUrl}`, reviewCreate);
    }

    updateReviews(id: number, reviewUpdate: ReviewUpdate): Observable<ReviewDto> {
        return this.http.put<ReviewDto>(`${this.apiUrl}/${id}`, reviewUpdate);
    }

    deleteReviews(id: number): Observable<void> {
        const res = this.http.delete<void>(`${this.apiUrl}/${id}`);
        console.log(res)
        return res
    }    
}