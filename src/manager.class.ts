import { TagClass } from './manager.interfaces';
import { Tag } from './tag.class';
import { generate } from 'shortid';

export class Manager {
    public createTag<T>(defaultValue?: T, parentTag?: TagClass<any>): TagClass<T> {
        // @TODO: register tag class within the tree
        return this.generateTagClass(defaultValue, parentTag);
    }



    private generateTagClass<T>(defaultValue?: T, parentTag?: TagClass<any>): TagClass<T> {
        return class extends Tag<T> {
            public static toString = () => generate();
            constructor( value?: T ) {
                let lDefaultValue = defaultValue;
                if ( lDefaultValue instanceof Object ) { super(Object.assign({}, defaultValue, value)); }
                else { super( arguments.length === 0 ? defaultValue : value); }
            }
        };
    }
}
