import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DB } from "../database-drizzle";
import { User, users } from "./schemas/users.schema";

@Injectable()
export class UserService {
  constructor(@Inject("db") private db: DB["sqlite"]) {}

  async findOne(email: string): Promise<User> {
    const result = this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .get();

    return result;
  }

  async all() {
    return this.db.select().from(users).all();
  }

  async create({ name, email, password }) {
    return this.db.insert(users).values({ name, email, password }).run();
  }
}
