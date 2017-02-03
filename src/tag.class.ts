import { generate } from 'shortid';

export class Tag<T extends any> {
    public toString(): string { return this.identifier; }
    constructor( public value: T ) {}

    private identifier = generate();
}
