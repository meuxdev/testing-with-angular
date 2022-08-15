import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let service: MasterService;

  beforeEach(() => {});

  it('should return "my val" from real service', () => {
    const valueService = new ValueService();
    const service = new MasterService(valueService);
    expect(service.getValue()).toBe('MY VAL');
  });

  it('should return "FAKE VAL" from obj', () => {
    const fake = { getValue: () => 'fake val' };
    const service = new MasterService(fake as ValueService);
    expect(service.getValue()).toBe('FAKE VAL');
  });

  it('should call get value from the value services once', () => {
    // Arrange
    const valueService = jasmine.createSpyObj('ValueService', ['getValue']);
    valueService.getValue.and.returnValue('fAkE VaL'.toUpperCase());
    const service = new MasterService(valueService);

    // Act
    const value = service.getValue();

    // Assert
    expect(value).toBe('FAKE VAL');
    expect(valueService.getValue).toHaveBeenCalledTimes(1);
  });
});
