import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
  companyCategory: text("company_category"),
});

//read more here: https://orm.drizzle.team/docs/zod - there are a lot more functions / modifications here
export const insertAccountSchema = createInsertSchema(accounts);
