import { useState } from "react";
import { registerUser } from "../api/users";

const Register = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
        nickname: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await registerUser(form);
        alert("회원가입 완료!");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 w-96 rounded shadow space-y-4"
            >
                <h1 className="text-xl font-bold text-center">회원가입</h1>

                <input
                    type="email"
                    placeholder="이메일"
                    className="border w-full p-2 rounded"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="비밀번호"
                    className="border w-full p-2 rounded"
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <input
                    type="text"
                    placeholder="닉네임"
                    className="border w-full p-2 rounded"
                    onChange={(e) =>
                        setForm({ ...form, nickname: e.target.value })
                    }
                />

                <button className="w-full bg-green-600 text-white py-2 rounded">
                    회원가입
                </button>
            </form>
        </div>
    );
};

export default Register;
    