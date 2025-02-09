import { Context } from "telegraf";

// Расширяем стандартный Context
export interface CustomContext extends Context {
    match: RegExpExecArray | null;
}