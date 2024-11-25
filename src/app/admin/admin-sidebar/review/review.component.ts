import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewDto } from "../../../model/review.model";
import { PropertyDto } from "../../../model/property.model";
import { UserDto } from "../../../model/user.model"; 
import { Subscription } from "rxjs";
import { ReviewService } from "./review.service";
import { PropertyService } from "../property/property.service";  // Import PropertyService
import { ReviewCreate } from "../../../model/review/create.model";
// import { UserService } from "../user/user.service";  // Nếu có UserService
import { HttpClientModule } from '@angular/common/http';

@Component({
    standalone: true,
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss'],
    imports: [CommonModule, FormsModule, HttpClientModule] 
})
export class ReviewComponent implements OnInit, OnDestroy {
    reviews: ReviewDto[] = [];
    properties: PropertyDto[] = [];  // Mảng properties
    users: UserDto[] = [];  // Mảng users
    private subscription: Subscription = new Subscription();

    constructor(
        private reviewService: ReviewService,
        private propertyService: PropertyService,  // Tiêm PropertyService
        // private userService: UserService  
    ) {}

    ngOnInit(): void {
        this.getReviews();
        this.getProperties(); // Lấy danh sách properties từ PropertyService
        // this.getUsers(); // Lấy danh sách users từ UserService
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    addReview() {
        if (this.properties.length === 0) {
            alert("Error: No properties available to assign.");
            return;
        }
        
        const reviewDateString = new Date().toISOString().split('T')[0];
        const reviewDate = new Date(reviewDateString);

        this.reviews.push({
            id: 0, // Mặc định là 0 hoặc undefined cho review chưa được lưu
            comment: '',
            overallRating: 0,
            reviewDate: reviewDate,
            isEditing: true,
            isUpdating: false,
            property: this.properties[0], // Gán property đầu tiên mặc định
            user: {
                id: 6,
                firstName: 'Default',
                lastName: 'User',
                emailAddress: 'default.user@example.com'
            } as UserDto
        });
    }
    

    getReviews() {
        this.subscription.add(
            this.reviewService.getReviews().subscribe({
                next: (response) => {
                    this.reviews = response.map(review => ({ ...review }));
                    console.log(this.reviews)
                },
                error: (error) => {
                    console.log("Error fetching reviews", error);
                }
            })
        );
    }

    getProperties() {
        this.subscription.add(
            this.propertyService.getProperties().subscribe({
                next: (response) => {
                    this.properties = response;
                    console.log("property:", this.properties)
                },
                error: (error) => {
                    console.log("Error fetching properties", error);
                }
            })
        );
    }

    // getUsers() {
    //     // Giả sử có API để lấy danh sách users từ UserService
    //     this.subscription.add(
    //         this.userService.getUsers().subscribe({
    //             next: (response) => {
    //                 this.users = response;
    //             },
    //             error: (error) => {
    //                 console.log("Error fetching users", error);
    //             }
    //         })
    //     );
    // }

    createReview(index: number) {
        const review = this.reviews[index];
        if (!review.overallRating) {
            alert("Error: Rating cannot be empty or zero.");
            return;
        }

        // Tạo payload theo ReviewCreate
        const reviewCreate: ReviewCreate = {
            overallRating: review.overallRating,
            comment: review.comment,
            reviewDate: review.reviewDate,
            propertyId: review.property.id, // Lấy propertyId từ property
            userId: 6 // Gán userId mặc định
        };
    
        this.subscription.add(
            this.reviewService.createReviews(reviewCreate).subscribe({
                next: (response) => {
                    // Cập nhật review mới từ response
                    this.reviews[index] = { ...response, isEditing: false, isUpdating: false };
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
                    this.reviews = this.reviews.filter(review => review.id !== this.reviews[index].id);
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
