import {
    Outlet,
    Link,
    useLoaderData,
    Form,
    redirect, NavLink
} from "react-router-dom";
import { getData, calculate } from "../api/addTwoNumber";
import "./contactHomePage.css"

export async function loader() {
    const data = await getData();
    return { data }
}

export async function action({ request }) {
    const formData = await request.formData();
    // const data = Object.fromEntries(formData);
    const result = await calculate({ number1: Number(formData.get("number1")), number2: Number(formData.get("number2")), operator: formData.get("operator") });
    // return redirect(`/addTwoNumber`)
    return null;
}

export default function AddTwoNumberPage() {
    const result = useLoaderData();
    const { data } = result;
    return (
        <>
            <div id="sidebar">
                <h1>React Router Add Two Numbers</h1>
                <Form method="post">
                    <label>
                        <span>Number 1</span>
                        <input
                            type="text"
                            name="number1"
                            placeholder="number1"
                            defaultValue={data.number1}
                        />
                    </label>
                    <label>
                        <span>Operator</span>
                        <input
                            type="text"
                            name="operator"
                            placeholder="+"
                            defaultValue={data.operator}
                        />
                    </label>
                    <label>
                        <span>Number 2</span>
                        <input
                            type="text"
                            name="number2"
                            placeholder="number2"
                            defaultValue={data.number2}
                        />
                    </label>
                    <label>
                        <span>Result</span>
                        {data.result}
                    </label>
                    <button type="submit">Calculate</button>
                </Form>



            </div>
        </>
    );
}
