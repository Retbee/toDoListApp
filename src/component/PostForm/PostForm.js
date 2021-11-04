import React from 'react';
import MyInput from "../UI/Input/MyInput";
import MyButton from "../UI/Button/MyButton";

const PostForm = ({create}) => {

    const [post, setPost] = React.useState({title: "", body: ""})

    const handleFormSubmit = (event) => {
        event.preventDefault()
        setPost({title: "", body: ""})
    }
    const handleOnChangeTitle = (event) => {
        setPost({...post, title: event.target.value})
    }
    const handleOnChangeBody = (event) => {
        setPost({...post, body: event.target.value})
    }
    const addNewPost = () => {
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title: "", body: ""})
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <MyInput
                value={post.title}
                onChange={handleOnChangeTitle}
                type="text"
                placeholder={"Название поста"}
            />
            <MyInput
                value={post.body}
                onChange={handleOnChangeBody}
                type="text"
                placeholder={"Описание поста"}
            />
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    );
};

export default PostForm;