import { useEffect, useState } from "react";
import { loadUsers } from "../api/apiCall";
import UserListItem, { User } from "./UserListItem";
import { useTranslation } from "react-i18next";

const UserList = () => {
    // TODO need to do something with result
    const [result, setResult] = useState("");
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { t } = useTranslation();

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
                <h3>{t("users")}</h3>
            </div>
            <ul className="list-group list-group-flush">
                {result &&
                    content.map((user: User) => {
                        return <UserListItem key={user.id} user={user} />;
                    })}
            </ul>
            <div className="card-footer">
                {page > 0 && (
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => loadData(page - 1)}>
                        {t("previousPage")}
                    </button>
                )}
                {totalPages > page + 1 && (
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => loadData(page + 1)}>
                        {t("nextPage")}
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserList;
