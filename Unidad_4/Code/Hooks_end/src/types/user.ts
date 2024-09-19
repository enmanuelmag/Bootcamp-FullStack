import z from 'zod';

export const UserSchema = z.object({
  name: z.string(),
  city: z.string(),
  age: z.number(),
  verified: z.boolean().optional(),
  url: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const UserCreateSchema = UserSchema.omit({ url: true });

export type UserCreate = z.infer<typeof UserCreateSchema>;

export const UserLoaderDataSchema = z.object({
  users: z.array(UserSchema),
});

export type UserLoaderData = z.infer<typeof UserLoaderDataSchema>;

export const UserByIndexLoaderDataSchema = z.object({
  user: UserSchema,
});

export type UserByIndexLoaderData = z.infer<typeof UserByIndexLoaderDataSchema>;
