import { __prod__ } from "./contants";
import { Post } from "./entities/Post";
import { MikroORM } from '@mikro-orm/core';
import path from 'path';

export default {
    migrations: {
        path: path.join(__dirname, './migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    entities: [Post],
    dbName: 'postgres',
    type: 'postgresql',
    port: 5433,
    debug: !__prod__,
    user: 'postgres',
    password: 'postgres' 
} as Parameters<typeof MikroORM.init>[0];