import { TagClass } from './manager.interfaces';
import { QueryTypes } from './query.enums';



export class Query {
    public toString(): string { return JSON.stringify(this); }

    constructor(
        public type: QueryTypes,
        public args: Array<Query | TagClass<any>>
    ) {
        this.validateQueryConsistency();
    }



    private validateQueryConsistency(): void {
        let orValid = this.type === QueryTypes.or && this.args.length >= 2 || true;
        let andValid = this.type === QueryTypes.and && this.args.length >= 2 || true;
        let notValid = this.type === QueryTypes.not && this.args.length === 1 || true;
        let allValid = this.type === QueryTypes.all && this.args.length === 0 || true;
        let noneValid = this.type === QueryTypes.none && this.args.length === 0 || true;

        if (!orValid) {
            throw new Error(`Incorrect 'OR' query! Must at least accept 2 arguments.`);
        }
        if (!andValid) {
            throw new Error(`Incorrect 'AND' query! Must at least accept 2 arguments.`);
        }
        if (!notValid) {
            throw new Error(`Incorrect 'NOT' query! Must accept single query or single tag.`);
        }
        if(!allValid || !noneValid) {
            throw new Error(`'ALL' and 'NONE' are special type of queries. They accept NO arguments.`);
        }
    }
}
