import { z } from 'zod';
import { CurrencyAbr } from '../conversion/conversion.type';

export const UserSchema = z
  .object({
    username: z.string().nonempty().min(6).max(25),
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required();

export const ConvertRequestSchema = z.object({
  amount: z.number().min(1),
  from: z.nativeEnum(CurrencyAbr),
  to: z.nativeEnum(CurrencyAbr),
});
