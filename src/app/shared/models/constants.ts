
export class Constants{
    
    lines:Array<string>;
    domains:Array<string>;
    types:Array<string>;
    programs:Array<string>;

    public constructor(init?:Partial<Error>) {
        Object.assign(this, init);
    }
} 