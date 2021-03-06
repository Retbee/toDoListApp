import React from 'react';
import MyInput from "../UI/Input/MyInput";
import Select from "../UI/Select/Select";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder="Поиск..."
            />
            <Select
                value={filter.sort}
                onChange={SelectedSort => setFilter({...filter, sort: SelectedSort})}
                defaultValue="Сортировка"
                options={[
                    {value: 'title', name: "По названию"},
                    {value: 'body', name: "По описанию"},
                ]}
            />
        </div>
    );
};

export default PostFilter;