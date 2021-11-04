import React, {useEffect, useMemo, useRef, useState} from "react";
import "../../styles/App.css"
import PostList from "../PostList/PostList";
import PostForm from "../PostForm/PostForm";
import PostFilter from "../PostFilter/PostFilter";
import MyModal from "../MyModal/MyModal";
import MyButton from "../UI/Button/MyButton";
import {usePosts} from "../hooks/usePosts";
import axios from "axios";
import PostService from "../API/PostService";
import Loader from "../UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount, getPagesArray} from "../utils/pages";
import {useObserver} from "../hooks/useObserver";
import Select from "../UI/Select/Select";

function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = React.useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = React.useState(0)
    const [limit, setLimit] = React.useState(10)
    const [page, setPage] = React.useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()

    let pagesArray = getPagesArray(totalPages)
    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })
    //
    //

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])
    //
    //
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }
    const removePost = (post) => {
        setPosts(posts.filter(elem => elem.id !== post.id))
    }
    const changePage = (page) => {
        setPage(page)
    }
    //
    //
    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <Select
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Количество элементов на странице"
                options={[
                    {value: 5, name: "5"},
                    {value: 10, name: "10"},
                    {value: 25, name: "25"},
                    {value: -1, name: "Показать все"},
                ]}
            />
            {postError &&
            <h1>Error: `${postError}`</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Посты про JS"}/>
            <div ref={lastElement} style={{height: "20px", background: "red"}}/>
            {isPostsLoading &&
                 <div style={{display: "flex", justifyContent: "center", marginTop: '50px'}}><Loader/></div>
            }
            <div className="page__wrapper">
                {pagesArray.map(p =>
                    <span
                        onClick={() => changePage(p)}
                        key={p}
                        className={page === p ? "page page__current" : 'page'}>
                        {p}
                    </span>
                )}
            </div>
        </div>
    );
}

export default Posts;
