import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DB } from "../database-drizzle";
import { User, users } from "./schemas/users.schema";

@Injectable()
export class UserService {
  constructor(@Inject("db") private db: DB["sqlite"]) {}

  findOne(email: string): User {
    const result = this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .get();

    return result;
  }

  all() {
    return this.db.select().from(users).all();
  }

  create({ name, email, password }) {
    return this.db.insert(users).values({ name, email, password }).run();
  }
}
