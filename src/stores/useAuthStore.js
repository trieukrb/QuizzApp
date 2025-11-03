import { create } from 'zustand';

const useAuthStore = create((set) => ({
    // Ban đầu, chúng ta không biết user là ai
    user: null,
    // Và chúng ta đang ở trạng thái "đang kiểm tra"
    loading: true,

    // Hàm này sẽ được "người gác cổng" gọi
    setUser: (user) => set({ user, loading: false }),

    // Hàm này để set loading khi cần
    setLoading: (loading) => set({ loading }),
}));

export default useAuthStore;