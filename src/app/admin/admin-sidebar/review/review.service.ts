import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { ReviewDto } from "../../../model/review.model";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    private apiUrl = "http://localhost:9000/api/user-review"

    constructor(private http: HttpClient) {}

    getReviews(): Observable<ReviewDto[]> {
        return this.http.get<ReviewDto[]>(`${this.apiUrl}`);
    }
    
    createReviews(review: ReviewDto): Observable<ReviewDto> {
        return this.http.post<ReviewDto>(`${this.apiUrl}`, review);
    }

    updateReviews(id: number, review: ReviewDto): Observable<ReviewDto> {
        return this.http.put<ReviewDto>(`${this.apiUrl}/${id}`, review);
    }

    deleteReviews(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}