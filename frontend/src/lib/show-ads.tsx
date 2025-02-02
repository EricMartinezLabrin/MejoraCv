import { useAuthStore } from "../store/authStore";

const token = useAuthStore((state) => state.token);
