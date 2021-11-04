import React from 'react';
import MyButton from "../../UI/Button/MyButton";
import {useHistory} from "react-router-dom";

const PostItem = (props) => {

    const router = useHistory()

    const handleRemovePost = () => {
        props.remove(props.post)
    }

    const handleOpenPost = () => {
        router.push(`/posts/${props.post.id}`)
    }

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__buttons">
                <MyButton onClick={handleOpenPost}>Открыть</MyButton>
                <MyButton onClick={handleRemovePost}>Удалить</MyButton>
            </div>
        </div>
    );
};

export default PostItem;