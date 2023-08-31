import { z } from 'zod';

export const schema = z.object({
  username: z
    .string({ required_error: 'Tidak boleh kosong.' })
    .min(3, { message: 'Minimal 3 karakter.' })
    .max(255, { message: 'Maksimal 255 karakter.' }),
  password: z
    .string({ required_error: 'Tidak boleh kosong.' })
    .min(6, { message: 'Minimal 6 karakter' })
    .max(255, {
      message: 'Maksimal 255 karakter.',
    }),
});

export type FormValues = z.infer<typeof schema>;

export const defaultValues: FormValues = {
  username: '',
  password: '',
};
