import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/slices/posts";

const Search = ({ onChange, search, type, placeholder }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts({ page: 1, search }));
    }, [search]);
    return (
        <>
            <form className="search">
                <input
                    value={search}
                    onChange={(e) => onChange(e)}
                    type={type}
                    placeholder={placeholder}
                />
                <i className="bi bi-search"></i>
            </form>
        </>
    );
};

export default Search;
