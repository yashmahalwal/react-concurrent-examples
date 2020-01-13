import React from "react";
import Link from "next/link";
interface Props {}

const Header: React.FunctionComponent<Props> = props => {
    return (
        <ul>
            <li>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </li>
            <li>
                <Link href="/async_update">
                    <a>Asynchronous State Update</a>
                </Link>
            </li>
            <li>
                <Link href="/filterable_list">
                    <a>Filterable List</a>
                </Link>
            </li>
        </ul>
    );
};

Header.displayName = "Header";
export default Header;
