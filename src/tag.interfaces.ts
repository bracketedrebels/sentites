export interface Class<T extends any> extends Function { new(...args: any[]): T; }
export interface TaggedClass<T extends TaggedClassInstance> extends Class<T> { }
export interface TaggedClassInstance { '#'?: string; }
