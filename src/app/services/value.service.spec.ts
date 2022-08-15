import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;
  let expectedDefaultValue: string = 'my val';

  beforeEach(() => {
    service = new ValueService();
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for Value', () => {
    it(`Should return '${expectedDefaultValue}'`, () => {
      // Arrange
      // Act
      const value = service.getValue();
      // Assert
      expect(value).toBe(expectedDefaultValue);
    });

    it('Should change the value', () => {
      // Arrange
      const value = service.getValue();
      const expectedNewValue: string = 'change';
      // Act
      service.setValue(expectedNewValue);
      const newValue: string = service.getValue();

      // Assert
      expect(newValue).not.toBe(value); // should change
      expect(newValue).toBe(expectedNewValue); // should change to the same value
    });
  });

  describe('Test for promise value', () => {
    it('Should return "promise value" from promise with done function', (doneFn) => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe('promise value');
        doneFn(); // end test explicit
      });
    });

    it('Should return "promise value" from promise with async await', async () => {
      const value = await service.getPromiseValue();
      expect(value).toBe('promise value');
    });
  });

  describe('Test for observable value', () => {
    it("Should Return 'observable value' for the observable", () => {
      // Arrang
      let value = '';
      const defaultValue = 'observable value';

      // Act
      service.getObservablePromise().subscribe({
        next: (_value) => {
          value = _value;
        },
      });

      // Assert
      expect(value).toBe(defaultValue);
    });
  });
});
