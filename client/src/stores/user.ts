import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        user: null as any
    }),
    actions: {
        changeUser(user: any) {
            this.user = user
        }
    }
})