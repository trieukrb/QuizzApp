import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    loading: true,

    // Hàm này sẽ được gọi khi đăng nhập ứng dụng lần đầu
    setUser: (user) => set({ user, loading: false }),

    // Hàm này để set loading khi cần
    setLoading: (loading) => set({ loading }),
}));

export default useAuthStore;