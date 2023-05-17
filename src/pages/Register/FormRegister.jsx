import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerApi } from '../../api/api';

export const FormRegister = () => {

    const navigate = useNavigate();

    const [response, setResponse] = useState("");

    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
        mode: "onBlur"
    });
    const onSubmit = async (data) => {
        try {
            await registerApi.register(data)

                .then(response => {
                    if (response.data.message) {
                        setResponse(response.data.message)
                    } else {
                        setResponse(response.data.message)
                    }

                })
                navigate('/login')
        } catch (error) {
            console.log(error)
            setResponse("Помилка при реєстрації, можливо така пошта зареєстрована. Error registering, possibly such mail is registered.")
        }
        reset();
    };

    return (
        <div>
            <h3>Реєстрація (Registration)</h3>
            <form className="form form-login" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                    <div className="input-field col s6 col s12 m6">
                        <input
                            type="text"
                            {...register("username",
                                {
                                    required: "Обовязкове поле (Required)",
                                    minLength: {
                                        value: 4,
                                        message: "Має бути мінімум 4 символи (Must be at least 4 characters)"
                                    }

                                })} />
                        <label>User name</label>
                    </div>
                </div>
                <div>
                {errors?.username && <p>{errors?.username?.message || "Помилка! (Error!)"}</p>}
                </div>

                <div className="row">
                    <div className="input-field col s6 col s12 m6">
                        <input
                            type="email"
                            {...register("email",
                                { required: "Обовязкове поле (Required)" })} />
                        <label>Email</label>
                    </div>
                </div>
                <div>
                    {errors?.email && <p>{errors?.email?.message || "Помилка! (Error!)"}</p>}
                </div>

                <div className="row">
                    <div className="input-field col s6 col s12 m6">
                        <input
                            type="password"
                            {...register("password",
                                {
                                    required: "Обовязкове поле (Required)",
                                    minLength: {
                                        value: 4,
                                        message: "Має бути мінімум 4 символи (Must be at least 4 characters)"
                                    }

                                })} />
                        <label>Password</label>
                    </div>
                </div>
                <div>
                {errors?.password && <p>{errors?.password?.message || "Помилка! (Error!)"}</p>}
                </div>

                <div className="row">
                    <button 
                    className="wawes-effect wawes-light btn btn blue" 
                    type="submit" 
                    disabled={!isValid}>

                        Зареєструватися (Register)
                    </button><br/><br/>
                    <Link to="/login">Вже є аккаунт (Have an account)</Link>
                </div>
            </form>
            <div style={{
                color: 'blue',
                fontSize: '18px',
                fontWeight: 'bold',
                maxWidth: '600px',
                padding: "15px"}}>
                {response}
            </div>
        </div>
    )
}

