import { generate } from 'shortid';
import { TagDefaultValueTypes } from './tag.interfaces';

export class Tag<T extends TagDefaultValueTypes> {
    public toString(): string { return this.identifier; }
    constructor( identifier: string, public readonly value: T ) {}

    protected static normalizeValue<T>(defaultValue: T, tagValue: T): T {
        return tagValue instanceof Object
            ? Object.assign({}, defaultValue, tagValue)
            : tagValue;
    }



    protected identifier: string;
}
