import React, { useState, useEffect } from "react";
import { postApi } from "../../../api/api";
import { useParams } from "react-router";
import Loader from "../../../components/Loader/Loader";

const PostPage = () => {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  let postId = params.id;

  console.log(post);

  useEffect(() => {
    setIsLoading(true);
    postApi
      .getPostId(postId)
      .then((response) => {
        const post = response.data;
        setPost(post);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setIsLoading(false);
      });
  }, [postId]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!post) {
    return <div>No post found! : {postId}</div>;
  }

  return (
    <div>
      <div className="p-5 border-solid border-t-2 border-white ">
        <div className="p-6 text-2xl">Title: {post.title}</div>
        <div className="pt-6 pl-6 text-xl w-2/3">{post.content}</div>
        <div className="pt-8">
          Author: "<strong>{post.author}</strong>"
        </div>
      </div>
    </div>
  );
};

export default PostPage;
