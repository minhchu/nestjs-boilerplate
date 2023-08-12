This project is in development

## Introduction

[Standards](https://xkcd.com/927/)

This boilerplate borrows idea from **shadcn/ui** that you can copy and paste receipts into your project.
This project includes some pre-configured parts that you basically need for every app (auth, orm, queue, email ...).
That is you can **own** your code, just copy and paste then making the changes according to your needs.

From [the docs](https://ui.shadcn.com/docs):

> **Why copy/paste and not packaged as a dependency?**
> 
> The idea behind this is to give you ownership and control over the code, allowing you to decide how the components are built and styled.
>
> Start with some sensible defaults, then customize the components to your needs.
>
> One of the drawback of packaging the components in an npm package is that the style is coupled with the implementation. The design of your components should be separate from their implementation.

## Injection tokens

So instead of writing:

```typescript
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

constructor(@Inject(CACHE_MANAGER) private cache: Cache)
```

we can use the string base injection:

```typescript
import { Cache } from "src/core/cache";

constructor(@Inject('cache') private cache: Cache)
```

It can reduce cognitive load IMO

|String|Usage|
|------|-----|
|`cache`|import { Cache } from "src/core/cache";<br/><br/>constructor(@Inject('cache') private cache: Cache)|
|`db:sqlite`|import { DB } from "src/core/database-drizzle";<br/><br/>constructor(@Inject('db') private db: DB['sqlite'])|
|`db:mysql`|import { DB } from "src/core/database-drizzle";<br/><br/>constructor(@Inject('db') private db: DB['mysql'])|
|`db:pgsql`|import { DB } from "src/core/database-drizzle";<br/><br/>constructor(@Inject('db') private db: DB['pgsql'])|
|`config`|import { ConfigService } from "@nestjs/config";<br/><br/>constructor(@Inject('config') private config: ConfigService)|

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

