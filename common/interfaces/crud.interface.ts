export interface CRUD {
    create: (resource: any) => Promise<string>;
    readById: (id: string) => Promise<any>;
    readByBlockNum: (blockNum: number) => Promise<any>
    list?: (limit: number, page: number) => Promise<any>;
    putById?: (id: string, resource: any) => Promise<string>;
    patchById?: (id: string, resource: any) => Promise<string>;
    deleteById?: (id: string) => Promise<string>;
}