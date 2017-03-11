import { Tag } from './tag.class';

export interface TagClass<T> {
    new (value?: T): Tag<T>;
}
