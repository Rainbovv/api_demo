import { z } from 'zod';

export const UserSchema = z
  .object({
    username: z.string().nonempty().min(6).max(25),
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required();
