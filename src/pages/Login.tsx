import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Login = () => {
    const navigate = useNavigate();
    const { loginAction } = useAuthStore();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await loginAction(form.email, form.password);
        navigate("/");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 w-96 rounded shadow space-y-4"
            >
                <h1 className="text-xl font-bold text-center">로그인</h1>

                <input
                    type="email"
                    placeholder="이메일"
                    className="border w-full p-2 rounded"
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <input
                    type="password"
                    placeholder="비밀번호"
                    className="border w-full p-2 rounded"
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <button className="bg-blue-600 w-full py-2 rounded text-white">
                    로그인
                </button>
            </form>
        </div>
    );
};

export default Login;
