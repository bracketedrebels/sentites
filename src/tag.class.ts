export class Tag<T extends any> {
    public toString(): string { return this.identifier; }
    constructor( private identifier: string, public readonly value: T ) {}
}
