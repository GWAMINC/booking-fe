import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewDto } from "../../../model/review.model";
import { Subscription } from "rxjs";
import { ReviewService } from "./review.service";
import { HttpClientModule } from '@angular/common/http';

@Component({
    standalone: true,
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss'],
    imports: [CommonModule, FormsModule, HttpClientModule] 
})
export class ReviewComponent implements OnInit, OnDestroy {
    reviews: ReviewDto[] = [];
    private subscription: Subscription = new Subscription();

    constructor(private reviewService: ReviewService) {}

    ngOnInit(): void {
        this.getReviews();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    addReview() {
        this.reviews.push({
            id: 0,
            comment: '',
            overallRating: 0,
            propertyId: 0,
            userId: 0,
            reviewDate: new Date(),
            isEditing: true,
            isUpdating: false
        });
    }

    getReviews() {
        this.subscription.add(
            this.reviewService.getReviews().subscribe({
                next: (response) => {
                    this.reviews = response.map(review => ({ ...review }));
                },
                error: (error) => {
                    console.log("Error fetching reviews", error);
                }
            })
        );
    }

    createReview(index: number) {
        if (!this.reviews[index].overallRating) {
            alert("Error: Rating cannot be empty or zero.");
            return;
        }
    
        this.subscription.add(
            this.reviewService.createReviews(this.reviews[index]).subscribe({
                next: (response) => {
                    // Cập nhật danh sách đánh giá trực tiếp mà không cần tải lại
                    this.reviews[index] = response;
                    alert("Review created successfully!");
                },
                error: (error) => {
                    console.log("Error creating review", error);
                }
            })
        );
    }
    
    updateReview(index: number) {
        if (!this.reviews[index] || !this.reviews[index].id) {
            alert("Error: Review ID is missing.");
            return;
        }
        
        this.subscription.add(
            this.reviewService.updateReviews(this.reviews[index].id, this.reviews[index]).subscribe({
                next: (response) => {
                    // Cập nhật danh sách đánh giá trực tiếp mà không cần tải lại
                    this.reviews[index] = response;
                    alert("Review updated successfully!");
                },
                error: (error) => {
                    console.log("Error updating review", error);
                }
            })
        );
    }
    
    deleteReview(index: number) {
        if (!this.reviews[index] || !this.reviews[index].id) {
            alert("Error: Review ID is missing.");
            return;
        }
        
        this.subscription.add(
            this.reviewService.deleteReviews(this.reviews[index].id).subscribe({
                next: () => {
                    // Xóa đánh giá khỏi danh sách mà không cần tải lại
                    this.reviews.splice(index, 1);
                    alert("Review deleted successfully!");
                },
                error: (error) => {
                    console.log("Error deleting review", error);
                }
            })
        );
    }
    

    saveReview(index: number) {
        if (!this.reviews[index].overallRating) {
            alert("Error: Rating cannot be empty or zero.");
            return;
        }

        this.subscription.add(
            this.reviewService.updateReviews(this.reviews[index].id, this.reviews[index]).subscribe({
                next: (response) => {
                    console.log('Review updated successfully');
                    alert("Review saved successfully!"); 
                },
                error: (error) => {
                    console.log("Error updating review", error);
                }
            })
        );
    }
}
