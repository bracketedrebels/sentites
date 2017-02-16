export class Tag<T extends any> {
    public toString(): string { return this.identifier; }
    constructor( private identifier: string, public readonly value: T ) {}

    protected static normalizeValue<T>(defaultValue: T, tagValue: T): T {
        return tagValue.constructor === Object
            ? Object.assign({}, defaultValue, tagValue)
            : tagValue;
    }
}
