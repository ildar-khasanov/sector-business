import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/slices/posts";
import Pagination from "./Pagination";
import TableHeader from "./TableHeader";
import "../scss/app.scss";
import Search from "./Search";

const PostsList = () => {
    const dispatch = useDispatch();
    const { posts, currentPage } = useSelector((state) => state.posts);
    const [search, setSearch] = useState("");

    const handleSearchFeild = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        dispatch(fetchPosts({ page: currentPage }));
    }, []);

    return (
        <div className="container">
            <Search
                onChange={handleSearchFeild}
                search={search}
                type="text"
                placeholder="Поиск по таблице"
            />
            <table className="table">
                <thead className="table-primary text-white">
                    <tr className="text-white">
                        <TableHeader title="ID" order="id" />
                        <TableHeader title="Заголовок" order="title" />
                        <TableHeader title="Описание" order="body" />
                    </tr>
                </thead>
                <tbody className="table-bordered">
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <th className="table-th" scope="row">
                                {post.id}
                            </th>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination search={search} />
        </div>
    );
};

export default PostsList;
