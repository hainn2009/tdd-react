import {
    Outlet,
    Link,
    useLoaderData,
    Form,
    redirect, NavLink
} from "react-router-dom";
import { getContacts, createContact } from "../api/contact";

export async function loader() {
    const contacts = await getContacts();
    return { contacts }
}

export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`)
}

export default function ContactHomePage() {
    const { contacts } = useLoaderData();
    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <Form method="post">
                    <button type="submit">New</button>
                </Form>

                <nav>
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    <NavLink to={`${contact.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive ? "active" : isPending ? "pending" : ""
                                        }>
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {contact.favorite && <span>★</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
                <div id="detail">
                    <Outlet />
                </div>

            </div>
        </>
    );
}
