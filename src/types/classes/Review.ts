export interface Review {
  id: string;
  bookingId: string;
  clientId: string;
  vehicleRating: number;
  driverRating?: number;
  serviceRating: number;
  comment: string;
  createdAt: Date;
}

export interface ReviewService {
  getReview(id: string): Promise<Review>;
  createReview(review: Partial<Review>): Promise<Review>;
  updateReview(id: string, data: Partial<Review>): Promise<Review>;
  deleteReview(id: string): Promise<boolean>;
  getReviewsByVehicle(vehicleId: string): Promise<Review[]>;
  getReviewsByDriver(driverId: string): Promise<Review[]>;
  getReviewsByClient(clientId: string): Promise<Review[]>;
  getReviewsByAgency(agencyId: string): Promise<Review[]>;
  calculateAverageRating(entityId: string, ratingType: string): Promise<number>;
  filterReviewsByRating(rating: number, ratingType: string): Promise<Review[]>;
  // getReviewStatistics(entityId: string, entityType: string): Promise<any>;
  canClientReview(clientId: string, bookingId: string): Promise<boolean>;
  generateAutoResponse(reviewId: string): Promise<string>;
  markReviewAsModerated(reviewId: string, moderatorId: string): Promise<Review>;
  flagInappropriateReview(reviewId: string, reason: string): Promise<void>;
}
