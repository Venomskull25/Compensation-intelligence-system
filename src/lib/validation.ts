import { z } from "zod";

export const createSalarySchema = z.object({
  company: z
    .string()
    .min(1, "Company is required"),

  role: z
    .string()
    .min(1, "Role is required"),

  level: z
    .string()
    .min(1, "Level is required"),

  location: z
    .string()
    .min(1, "Location is required"),

  baseSalary: z
    .number()
    .nonnegative("Base salary cannot be negative"),

  stock: z
    .number()
    .nonnegative("Stock cannot be negative"),

  bonus: z
    .number()
    .nonnegative("Bonus cannot be negative"),
});

export const compareSchema = z.object({
  ids: z
    .array(z.number())
    .min(2, "At least 2 IDs required"),
});