import { Name } from './name';

describe('Name entity', () => {
  it('should not be able to create a name with less than 3 characters', () => {
    expect(() => new Name('Jo')).toThrowError('Nome inválido');
  });

  it('should not be able to create a name without lastname(s)', () => {
    expect(() => new Name('John')).toThrowError('É necessário o nome completo');
  });

  it('should be able to create a name instance with a valid name', () => {
    const name = new Name('John Doe');

    expect(name).toHaveProperty('firstName');
    expect(name).toHaveProperty('lastName');
  });
});
