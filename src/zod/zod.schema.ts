import { z } from 'zod';
import { CurrencyAbr } from '../conversion/conversion.type';
import { getNextDay } from '../common/utility/time.utility';

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
  date: z.coerce
    .date()
    .max(getNextDay())
    .min(new Date('2024-01-01'))
    .optional(),
});
