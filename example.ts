class ExampleClass {
  private privateProperty: string = 'private value';

  public getPrivateProperty(): string {
    return this.privateProperty;
  }
}

const example = new ExampleClass();
console.log(example.privateProperty); 
