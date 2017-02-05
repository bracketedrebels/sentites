import { Tag } from './tag.class';

export interface TagClass<T> extends Function {
    new (defaultValue: T): Tag<T>;
}
