import { TagClass } from './manager.interfaces';
import { QueryTypes } from './query.enums';
import { QuerySerializable } from './query.interfaces';



export class Query {
    /**
     * Seriallizes query into string representation. This representatino
     * is unique for unique query. Note, that representation of query
     * AND(Tag1, Tag2) is undistinguishable from representation of query
     * AND(Tag2, Tag1).
     * @returns query string representation.
     */
    public toString(): string { return JSON.stringify(this.serialize(), null, 0); }

    constructor(
        public type: QueryTypes,
        public args: Array<Query | TagClass<any>>
    ) { this.validateQueryConsistency(); }



    private validateQueryConsistency(): void {
        if (this.type === QueryTypes.or && this.args.length < 2) {
            throw new Error(`Incorrect 'OR' query! Must at least accept 2 arguments.`);
        }
        if (this.type === QueryTypes.and && this.args.length < 2) {
            throw new Error(`Incorrect 'AND' query! Must at least accept 2 arguments.`);
        }
        if (this.type === QueryTypes.not && this.args.length !== 1) {
            throw new Error(`Incorrect 'NOT' query! Must accept single query or single tag.`);
        }
        if((this.type === QueryTypes.all || this.type === QueryTypes.none) && this.args.length !== 0) {
            throw new Error(`'ALL' and 'NONE' are special type of queries. They accept NO arguments.`);
        }
    }

    private serialize(): QuerySerializable {
        return {
            type: this.type,
            args: this.args.map( arg => arg instanceof Query ? arg.serialize() : arg.toString() ).sort()
        };
    }
}
