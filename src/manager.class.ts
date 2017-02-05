import { TagClass } from './manager.interfaces';
import { Tag } from './tag.class';
import { generate } from 'shortid';

export class Manager {
    public createTag<T>(defaultValue?: T, parentTag?: TagClass<any>): TagClass<T> {
        let lIdentifier = generate();
        // @TODO: register tag class within the tree
        return this.generateTagClass(lIdentifier, defaultValue, parentTag);
    }



    private generateTagClass<T>(identifier: string, defaultValue?: T, parentTag?: TagClass<any>): TagClass<T> {
        return class extends Tag<T> {
            public static toString(): string { return identifier; }
            constructor( value?: T ) { super( identifier, arguments.length === 0 
                ? Object.assign({}, defaultValue)
                : Tag.normalizeValue(defaultValue, value) );
            }
        };
    }
}
