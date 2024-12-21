import { useEffect, useState } from "react";
import { loadUsers } from "../api/apiCall";

const UserList = () => {
    const [result, setResult] = useState("");
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        (async function () {
            setResult("");
            try {
                const {
                    data: { content, page, size, totalPages },
                } = await loadUsers(0, 3);
                setContent(content);
                setPage(page);
                setSize(size);
                setTotalPages(totalPages);
                setResult("success");
            } catch (error) {
                setResult("fail");
            }
        })();
    }, []);
    return (
        <div className="card">
            <div className="card-header text-center">
                <h3>Users</h3>
            </div>
            {page} {size} {totalPages}
            <ul className="list-group list-group-flush">
                {result &&
                    content.map((user: any, index) => {
                        //TODO: can sua any o day
                        return (
                            <li className="list-group-item list-group-item-action" key={index}>
                                {user.username}
                            </li>
                        );
                    })}
            </ul>
            {totalPages > page + 1 && (
                <button
                    onClick={async () => {
                        const {
                            data: { content, page: currentPage, size, totalPages },
                        } = await loadUsers(page + 1);
                        setContent(content);
                        setPage(currentPage);
                        setSize(size);
                        setTotalPages(totalPages);
                    }}
                >
                    next &gt;
                </button>
            )}
        </div>
    );
};

export default UserList;
