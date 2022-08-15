import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Value Service', ['getValue']);
    TestBed.configureTestingModule({
      providers: [MasterService, { provide: ValueService, useValue: spy }],
    });
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(
      ValueService
    ) as jasmine.SpyObj<ValueService>;

    valueServiceSpy.getValue.and.returnValue('my val');
  });

  it('should be create', () => {
    expect(masterService).toBeTruthy();
  });

  it('should return "my val" from real service', () => {
    expect(masterService.getValue()).toBe('MY VAL');
  });

  // it('should return "FAKE VAL" from obj', () => {
  //   const fake = { getValue: () => 'fake val' };
  //   const service = new MasterService(fake as ValueService);
  //   expect(service.getValue()).toBe('FAKE VAL');
  // });

  it('should call get value from the value services once', () => {
    // Arrange
    valueServiceSpy.getValue.and.returnValue('fAkE VaL'.toUpperCase());

    // Act
    const value = masterService.getValue();

    // Assert
    expect(value).toBe('FAKE VAL');
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
});
