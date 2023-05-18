import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import { loginApi } from '../../api/api';

export const FormLogin = () => {

    const navigate = useNavigate()

    const {login} = useContext(AuthContext)


    const {register, handleSubmit, reset,  formState: {errors, isValid}} = useForm({
        mode: "onBlur"
    })

    const [response, setResponse] = useState("");

  const onSubmit = async (data) => {
    try {
        await loginApi.login(data)
            .then(response => {
                login(response.data.token)
            })
            setResponse("Авторизація пройшла успішно! (Authorization successful!)")

            setTimeout(1000)
            navigate('/')
            
    } catch (error) {
        console.log(error)
        setResponse("Помилка при авторизації! (Error in authorization)")
    }
    // alert(JSON.stringify(data));
    reset();
};

    return(
        <div>
            <h3>Авторизація (Authorization)</h3>
                    <form className="form form-login" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="input-field col s6 col s12 m6">
                                <input
                                    type="email"
                                    {...register("email",
                                    { required: "Обовязкове поле (Required)"})} />
                                    <label>Email</label>
                            </div>
                            {errors?.email && <p>{errors?.email?.message || "Помилка! (Error!)"}</p>}
                        </div>

                        <div className="row">
                            <div className="input-field col s6 col s12 m6">
                                <input
                                    type="password"
                                    {...register("password", 
                                    {required: "Обовязкове поле (Required)"})} />
                                    <label>Password</label>
                            </div>
                            {errors?.password && <p>{errors?.password?.message || "Помилка! (Error!)"}</p>}
                        </div>
                        <div className="row">
                            <button 
                            disabled={!isValid} 
                            type="submit"  
                            className="wawes-effect wawes-light btn btn blue ">
                                Увійти (Log in)
                            </button>
                            <Link className="btn-outline btn-reg" to="/register">Немає аккаунта (Create account?)</Link>
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

