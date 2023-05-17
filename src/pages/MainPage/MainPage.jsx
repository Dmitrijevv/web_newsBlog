import React, { useEffect, useState } from "react";
import { postApi } from "../../api/api";
import s from './MainPage.module.css';
import { NavLink } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const MainPage = () => {

    const [news, setNews] = useState(null)


    useEffect(() => {
        try {
            postApi.getPost()
            .then((response) => {
                const news = response.data;
                setNews(news);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);


    
    if (!!news) {
        return (
            <div className="text-slate-300">
                <h4 className="">Новини та пости авторів <br/>News and posts of authors</h4>
                {news.map((getNews) => <ul key={getNews.id} className={s.container}>
                    <li className={s.post_container}>
                    <NavLink to={`/post/${getNews._id}`} className="card-link">
                        <div className={s.name_author}>Імя автора (Author's name): {getNews.author}</div>
                        <div className={s.name_title}>Заголовок (Title): {getNews.title}</div>
                        <div className="truncate">Стаття (Post): {getNews.content}</div>
                        <div className={s.content }>Дата публікації (Date of publication) {getNews.timestamp}</div>
                        </NavLink>
                    </li></ul>)}
            </div>
        )
    }
    return (
        <Loader/>
    )
}

export default MainPage;