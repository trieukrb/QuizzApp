// tailwind.config.js (hoặc .mjs)

// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default { // <-- THAY ĐỔI Ở ĐÂY
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {

        extend: {
            // Ví dụ: Thêm một màu sắc tùy chỉnh
            colors: {
                'p': {
                    '50': 'var(--color-cyan-50)',
                    '100': 'var(--color-cyan-100)',
                    '200': 'var(--color-cyan-200)',
                },


            }
        },
    },
    plugins: [],
}