import "reflect-metadata";

import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './contants';
// import { Post } from './entities/Post';
import microConfig from './mikro-orm.config';
import express from 'express';

//graphql
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';

const main = async() => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    // const post = orm.em.create(Post, { title: "My first post" });
    // await orm.em.persistAndFlush(post);
    // await orm.em.nativeInsert(Post, { title: "My second post" });

    //find
    //const post = await orm.em.find(Post, {});
    //console.log("This is posts: ", post)

    const app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({ 
            resolvers: [HelloResolver, PostResolver],
            validate: false
        }),
        //context is special kind of object that is accessible by all of the resolvers.
        context: () => ({ em: orm.em }) //function that returns object for the context.
    }) 

    apolloServer.applyMiddleware({ app })

    app.get('/', (_, res) => res.send("Hello World."))
    app.listen(4000, () => console.log("Server started on localhost: 4000"))
};

main().catch(err => console.log(err));