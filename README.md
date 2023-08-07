## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript boilerplate.

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

|String|Usage|
|------|-----|
|`cache`|import { Cache } from "src/core/cache";<br/><br/>constructor(@Inject('cache') private cache: Cache)|

It can reduce cognitive load IMO

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

