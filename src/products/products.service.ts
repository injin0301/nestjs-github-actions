import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    getProducts() {

        // Copy object in a new array
        return [...this.products];
    }

    getSingleProduct(prodId: string) {
        const product = this.products.find(prod => prod.id === prodId);

        if (!product) {
            throw new NotFoundException('Could not find product.');
        }
        // Copy in a new object
        return {... product};
    }

    updateProduct(prodId: string, title: string, description: string, price: number): void {
        const productIndex = this.products.findIndex(prod => prod.id === prodId);
    
        if (productIndex !== -1) {
            const updatedProduct = { ...this.products[productIndex] };
    
            if (title !== undefined && title !== null) {
                updatedProduct.title = title;
            }
    
            if (description !== undefined && description !== null) {
                updatedProduct.description = description;
            }
    
            if (price !== undefined && price !== null) {
                updatedProduct.price = price;
            }
    
            this.products[productIndex] = { ...updatedProduct };
        } else {
            // Handle the case where the product with the specified ID was not found.
            // You can throw an exception or handle it according to your application logic.
            console.error(`Product with ID ${prodId} not found.`);
        }
    }
    

    addProduct(title: string, description: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, description, price);
        this.products.push(newProduct);

        return prodId;
    }

    deleteProduct(prodId: string): void {
        const index = this.products.findIndex(prod => prod.id === prodId);
    
        if (index !== -1) {
            this.products.splice(index, 1);
        }
    }
    
}