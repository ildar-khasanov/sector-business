import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sorting } from "../redux/slices/posts";

const TableHeader = ({ title, order }) => {
    const dispatch = useDispatch();
    const { sortBy } = useSelector((state) => state.posts);
    return (
        <>
            <th className="test text-white pb-3" scope="col">
                <span onClick={() => dispatch(sorting(order))}>
                    {title}
                    {sortBy.path === order && sortBy.order === "asc" ? (
                        <i className="bi bi-caret-up-fill"></i>
                    ) : (
                        <i className="bi bi-caret-down-fill"></i>
                    )}
                </span>
            </th>
        </>
    );
};

export default TableHeader;
