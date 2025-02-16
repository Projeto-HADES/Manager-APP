import { router } from "expo-router";

export function navigation(page: string) {
    router.navigate(page as any);
}