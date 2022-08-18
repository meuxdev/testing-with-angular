import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

fdescribe('ProductService', () => {
  let service: ProductService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // imports: [HttpClientModule],
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for the GetAllSimple', () => {
    it('should return a product list', (doneFn) => {
      // arrange
      const mockData: Product[] = [
        {
          id: '123',
          title: 'title',
          description: 'blabla',
          price: 12,
          category: {
            id: 112,
            name: 'as',
          },
          images: ['img', 'img'],
        },
      ];
      // Act
      service.getAllSimple().subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const request = httpController.expectOne(url);
      request.flush(mockData);
      httpController.verify();
    });
  });
});
