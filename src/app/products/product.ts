export interface Product {
  id: number; // This field must be 'id' for in-memory API to work with get by id
  productName: string;
  productCode: string;
  tags?: string[];
  releaseDate: string;
  description: string;
  price: number;
  starRating: number;
  imageUrl: string;
}
