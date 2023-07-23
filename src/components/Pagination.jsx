import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/slices/posts";

const Pagination = ({ search }) => {
    const dispatch = useDispatch();
    const { currentPage, totalCount } = useSelector((state) => state.posts);

    let amountPage = [];
    for (let i = 0; i < totalCount / 10; i++) {
        amountPage.push(i + 1);
    }

    const changePageBack = () => {
        if (currentPage > 1)
            dispatch(fetchPosts({ page: currentPage - 1, search }));
    };
    const changePageForward = () => {
        if (currentPage < totalCount / 10)
            dispatch(fetchPosts({ page: currentPage + 1, search }));
    };

    return (
        <div className="pagination-list">
            <div
                className={currentPage === 1 ? "disabled" : ""}
                onClick={changePageBack}
            >
                Назад
            </div>

            <ul>
                {amountPage.map((page) => (
                    <li
                        onClick={() =>
                            dispatch(fetchPosts({ page: page, search }))
                        }
                        className={currentPage === page ? "active" : ""}
                        key={page}
                    >
                        {page}
                    </li>
                ))}
            </ul>
            <div
                className={
                    currentPage === Math.ceil(totalCount / 10) ? "disabled" : ""
                }
                onClick={changePageForward}
            >
                Далее
            </div>
        </div>
    );
};

export default Pagination;
