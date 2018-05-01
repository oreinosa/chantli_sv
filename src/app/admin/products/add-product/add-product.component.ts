import { Component, ViewChild } from '@angular/core';
import { UploaderComponent } from '../../../uploader/uploader.component';
import { Add } from '../../../shared/classes/add';
import { Product } from '../../../shared/classes/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { CategoriesService } from '../../categories/categories.service';
import { Category } from '../../../shared/classes/category';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent extends Add<Product>  {
  @ViewChild(UploaderComponent) uploader: UploaderComponent;
  categories: Observable<Category[]>;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public productsService: ProductsService,
    public categoriesService: CategoriesService
  ) {
    super(productsService, router, route);
  }

  initForm() {
    this.categories = this.categoriesService.getAll();
    this.object = new Product();
  }

  onSubmit(product: Product): Promise<void> {
    return this.uploader
      .onSubmit('products', this.object.name)
      .then(imageURL => product.imageURL = imageURL)
      .then(() => super.onSubmit(product));
  }

}
