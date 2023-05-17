import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import { postApi } from '../../api/api';

const PostInServer = () => {

    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
        mode: "onBlur"
    });

    const [response, setResponse] = useState("");

    const onSubmit = async (data) => {
        try {
            await postApi.sendPost(data)
            .then(response => {
                if (response.data.message) {
                    setResponse(response.data.message)
                } else {
                    setResponse(response.data.message)
                }
            })
        } catch (error) {
            console.log(error)
            setResponse("Помилка при публікації.")
        }
        reset()
    }
    return (
        <div className="row ">
            <h3 className="center-align">Публікація статті (Publication of the article)</h3>
            <div className="row">
                <form className="col s12" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="input-field col s6 col s12 m6">
                            <input className="validate"
                                id="first_name2"
                                type="text"
                                {...register("author",
                                    {
                                        required: "Обовязкове поле",
                                        minLength: {
                                            value: 4,
                                            message: "Імя автора має бути мінімум 4 символи."
                                        }
                                    })} />
                            {errors?.author && <p>{errors?.author?.message || "Помилка!"}</p>}
                            <label className="active" for="first_name2">Автор (Author)</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s6 col s12 m6">
                            <input className="validate"
                                id="first_name2"
                                type="text"
                                {...register("title",
                                    {
                                        required: "Обовязкове поле"
                                    })} />
                            {errors?.title && <p>{errors?.title?.message || "Помилка!"}</p>}
                            <label className="active" for="first_name2">Заголовок (Title)</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6 col s12 m6">
                            <textarea className="materialize-textarea"
                                id="textarea1"
                                {...register("content",
                                    {
                                        required: "Обовязкове поле"
                                    })} />
                            {errors?.content && <p>{errors?.content?.message || "Помилка!"}</p>}
                            <label for="textarea1">Стаття (Constent post)</label>
                        </div>
                    </div>
                    <div className="row">
                        <button 
                        className="wawes-effect wawes-light btn btn blue" 
                        type="submit"
                        disabled={!isValid}>
                            Опублікувати (Publish)
                        </button>
                    </div>
                </form>
            </div>
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

export default PostInServer;