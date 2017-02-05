export function listify<T>( items: T[] | T ): T[] {
    return items instanceof Array ? items : [items];
}
