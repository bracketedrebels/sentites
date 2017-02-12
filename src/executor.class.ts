import { Entity } from './entity.class';
import { TagClass } from './manager.interfaces';

import { Query } from './query.class';
import { QueryTypes } from './query.enums';
import { andExecutor, orExecutor, notExecutor, setsIntersector, setsUnioner, setInvertor } from './executor.helpers';



export class QueryExecutor {
    constructor( private entities: Entity[] ) {}

    public execute( query: Query ): Entity[] {
        return this.executeRecursive(query, this.entities);
    }



    private mutation: Entity[];

    private executeRecursive(query: Query, ents: Entity[]): Entity[] {
        let lTags = [];
        let lSubqueries = [];
        let lType = query.type;
        query.args.forEach( arg => (arg instanceof Query ? lSubqueries : lTags).push(arg) );
        let lEntitesSets = [];
        if (lTags.length) {
            lEntitesSets.push(this.proceedTags(lType, lTags, ents));
        }
        if (lSubqueries) {
            lEntitesSets = lEntitesSets.concat(this.proceedSubqueries(lSubqueries, ents));
        }
        return this.combineEntitiesSets(lType, lEntitesSets);
    }

    private proceedTags(type: QueryTypes, tags: TagClass<any>[], ents: Entity[]): Entity[] {
        switch(type) {
            case QueryTypes.or:
                return orExecutor(tags, ents);
            case QueryTypes.and:
                return andExecutor(tags, ents);
            case QueryTypes.not:
                return notExecutor(tags[0], this.entities);
        }
    }

    private proceedSubqueries(queries: Query[], ents: Entity[]): Entity[][] {
        return queries.reduce( (acc, v) => {
            acc.push( this.executeRecursive(v, ents) );
            return acc;
        }, [] );
    }

    private combineEntitiesSets(type: QueryTypes, entSets: Entity[][]): Entity[] {
        switch(type) {
            case QueryTypes.or:
                return setsUnioner(entSets);
            case QueryTypes.and:
                return setsIntersector(entSets);
            case QueryTypes.not:
                // assuming that query is valid and consume only one argument
                return setInvertor(entSets[0], this.entities);
        }
    }
}
