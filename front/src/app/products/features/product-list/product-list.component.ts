import { CurrencyPipe } from "@angular/common";
import { Component, OnInit, Signal, inject, signal } from "@angular/core";
import { FormControl, FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';



const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [RatingModule, TagModule, DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent, FormsModule, CurrencyPipe, BadgeModule ],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  public products = this.productsService.products;

  public filteredProducts: Product[] = [];

  filterText: string = ''; 
  first: number = 0; 
  itemsPerPage: number = 5;

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);

  ngOnInit() {
    this.productsService.get().subscribe();

    this.productsService.get().subscribe(
      products => this.filteredProducts = products
    )
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onAddToCart(product: Product) {
    // this.isCreation = true;
    // this.isDialogVisible = true;
    // this.editedProduct.set(emptyProduct);
    this.productsService.addProductIntoCart(product);

  }

  public onDeleteFromCart(product: Product) {

    this.productsService.deleteProductFromCart(product.id);

  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }


    // Function to handle filter logic
    onFilter() {

      this.filteredProducts = this.filteredProducts.filter(product => 
        product.name.toLowerCase().includes(this.filterText.toLowerCase()) ||
        product.category.toLowerCase().includes(this.filterText.toLowerCase())
      );
      this.first = 0;

    }
  
    // Function to handle pagination
    onPage(event: { first: number; rows: number; }) {
      this.first = event.first;
      this.itemsPerPage = event.rows;
    }

}
