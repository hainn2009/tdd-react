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
                } = await loadUsers();
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
                {page} {size} {totalPages}
                {result &&
                    content.map((user: any, index) => {
                        return <span key={index}>{user.username}</span>;
                    })}
            </div>
        </div>
    );
};

export default UserList;
