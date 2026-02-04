import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// users
export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    name: varchar("name", { length: 100 }),
    email: varchar("email", { length: 150 }).unique(),

    image: varchar("image", { length: 255 }),
    provider: varchar("provider", { length: 30 })
      .notNull()
      .default("credentials"),

    providerAccountId: varchar("provider_account_id", { length: 255 }),

    passwordHash: varchar("password_hash", { length: 255 }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    emailIdx: index("users_email_idx").on(table.email),
    providerIdx: index("users_provider_idx").on(table.provider),
  }),
);

// projects
export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id").references(() => users.id, {
    onDelete: "set null",
  }),

  name: varchar("name", { length: 150 }).notNull(),
  description: text("description"),

  theme: varchar("theme", { length: 50 }),
  isFinalized: boolean("is_finalized").default(false).notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// screens
export const screens = pgTable("screens", {
  id: uuid("id").defaultRandom().primaryKey(),

  projectId: uuid("project_id").references(() => projects.id, {
    onDelete: "set null",
  }),

  name: varchar("name", { length: 100 }),
  order: varchar("order", { length: 10 }),

  htmlCode: text("html_code").notNull(),
  cssCode: text("css_code"),
  tailwindConfig: text("tailwind_config"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ai-generations
export const aiGenerations = pgTable("ai_generations", {
  id: uuid("id").defaultRandom().primaryKey(),

  screenId: uuid("screen_id").references(() => screens.id, {
    onDelete: "set null",
  }),

  prompt: text("prompt").notNull(),
  systemPrompt: text("system_prompt"),

  modelProvider: varchar("model_provider", { length: 20 }),
  modelUsed: varchar("model_used", { length: 50 }),

  generatedHtml: text("generated_html"),
  generatedCss: text("generated_css"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// exports
export const exportsTable = pgTable("exports", {
  id: uuid("id").defaultRandom().primaryKey(),

  projectId: uuid("project_id").references(() => projects.id, {
    onDelete: "set null",
  }),

  exportedBy: uuid("exported_by").references(() => users.id, {
    onDelete: "set null",
  }),

  exportType: varchar("export_type", { length: 50 }),
  fileUrl: text("file_url").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ================
// Relations
// ================
export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  exports: many(exportsTable),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
  screens: many(screens),
  exports: many(exportsTable),
}));

export const screensRelations = relations(screens, ({ one, many }) => ({
  project: one(projects, {
    fields: [screens.projectId],
    references: [projects.id],
  }),
  aiGenerations: many(aiGenerations),
}));

export const aiGenerationsRelations = relations(aiGenerations, ({ one }) => ({
  screen: one(screens, {
    fields: [aiGenerations.screenId],
    references: [screens.id],
  }),
}));

export const exportsRelations = relations(exportsTable, ({ one }) => ({
  project: one(projects, {
    fields: [exportsTable.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [exportsTable.exportedBy],
    references: [users.id],
  }),
}));
