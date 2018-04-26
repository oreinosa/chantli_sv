import { Component, ViewChild } from '@angular/core';
import { Product } from '../../../shared/classes/product';
import { Edit } from '../../../shared/classes/edit';
import { ProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UploaderComponent } from '../../../uploader/uploader.component';
import { CategoriesService } from '../../categories/categories.service';
import { Category } from '../../../shared/classes/category';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent extends Edit<Product> {
  categories: Observable<Category[]>;
  @ViewChild(UploaderComponent) uploader: UploaderComponent;

  constructor(
    public productsService: ProductsService,
    public router: Router,
    public route: ActivatedRoute,
    public categoriesService: CategoriesService
  ) {
    super(productsService, router, route);
  }

  ngOnInit() {
    super.ngOnInit();
    this.categories = this.categoriesService.getAll();
  }

  onSubmit(product: Product): Promise<void> {
    if (this.uploader.image) {
      return this.uploader
        .onSubmit('products', this.object.name)
        .then(imageURL => product.imageURL = imageURL)
        .then(() => super.onSubmit(product));
    }
    console.log('image not edited')
    return super.onSubmit(product);
  }

}