import { useEffect, useState } from "react";
import { loadUsers } from "../api/apiCall";
import { useNavigate } from "react-router-dom";

const UserList = () => {
    // TODO need to do something with result
    const [result, setResult] = useState("");
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const loadData = async (pageIndex: number = 0) => {
        setResult("");
        try {
            const {
                data: { content, page, totalPages },
            } = await loadUsers(pageIndex);
            setContent(content);
            setPage(page);
            setTotalPages(totalPages);
            setResult("success");
        } catch (error) {
            setResult("fail");
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="card">
            <div className="card-header text-center">
                <h3>Users</h3>
            </div>
            <ul className="list-group list-group-flush">
                {result &&
                    content.map((user: any, index) => {
                        //TODO: can sua any o day
                        return (
                            <li
                                className="list-group-item list-group-item-action"
                                style={{ cursor: "pointer" }}
                                key={index}
                                onClick={() => navigate(`/user/${user.id}`)}
                            >
                                {user.username}
                            </li>
                        );
                    })}
            </ul>
            <div className="card-footer">
                {page > 0 && (
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => loadData(page - 1)}>
                        &lt; previous
                    </button>
                )}
                {totalPages > page + 1 && (
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => loadData(page + 1)}>
                        next &gt;
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserList;
