import { Tag } from './tag.class';

export interface TagClass<T> extends Function {
    new (value?: T): Tag<T>;
}
