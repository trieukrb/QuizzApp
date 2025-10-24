// tailwind.config.js (hoặc .mjs)

/** @type {import('tailwindcss').Config} */
export default {
    theme: {

        extend: {
            // Ví dụ: Thêm một màu sắc tùy chỉnh
            colors: {
                'gem-blue': '#007BFF',
            },
            // Ví dụ: Thêm một font chữ
            fontFamily: {
                'vietnam': ['"Be Vietnam Pro"', 'sans-serif'],
            }
        },
    },
    plugins: [],
}