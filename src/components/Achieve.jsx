import React from 'react';
import {  useState, useEffect} from 'react'
import axios from "axios";
const Achieve = () => {
    // 1. State để lưu dữ liệu khi thành công (một mảng người dùng)
    const [users, setUsers] = useState([]);

    // 2. State để theo dõi trạng thái chờ (bắt đầu là true vì ta sẽ tải ngay)
    const [loading, setLoading] = useState(true);

    // 3. State để lưu thông báo lỗi khi thất bại (bắt đầu là null)
    const [error, setError] = useState(null);

    // Đặt đoạn code này bên trong component UserList
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('https://jsonplaceholder.typicode.com/users');
                setUsers(res.data)
            }
            catch (err){
                setError('loi roi')
            }
            finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, []);




     // Mảng rỗng đảm bảo chỉ gọi 1 lần

    // Đặt đoạn code này bên trong component, sau useEffect

    // Ưu tiên 1: Nếu đang tải, hiển thị thông báo loading
        if (loading) {
            return <div>Đang tải dữ liệu...</div>;
        }

    // Ưu tiên 2: Nếu có lỗi, hiển thị thông báo lỗi
        if (error) {
            return <div>{error}</div>;
        }

    // Mặc định: Nếu không loading và không có lỗi, hiển thị dữ liệu
    return (
        <div className='container'>
            <h1>Danh sách người dùng</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Achieve;