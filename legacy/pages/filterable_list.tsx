import React, { ReactSVG } from "react";
import { NextPage } from "next";
import makeStyles from "@material-ui/styles/makeStyles";
interface Item {
    id: string | number;
    title: string;
    subtitle: React.ReactNode;
    description: React.ReactNode;
    imgSrc: string;
}

const useStyles = makeStyles(() => ({
    section: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        flexGrow: 1
    },
    root: {
        textAlign: "center",
        maxWidth: "25vw",
        padding: 8,
        ["@media (max-width: 1100px)"]: {
            maxWidth: "50vw"
        },
        ["@media (max-width: 800px)"]: {
            maxWidth: "100vw"
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    inputLabel: {}
}));

// Photo by Ben Libby from Pexels : CUP
const List = Array.from({ length: 10000 }).map((_, index) => {
    let x: Item;
    const id = Math.random() * 1000 + Date.now();
    if (index % 2) {
        x = {
            id,
            title: `Cup ${(index - 1) / 2 + 1}`,
            description: <p>The best damn cup there is</p>,
            subtitle: <span>Make it yours today</span>,
            imgSrc: "/cup.jpg"
        };
    } else {
        x = {
            id,
            title: `Book ${index / 2 + 1}`,
            description: <p>The best damn book there is</p>,
            subtitle: <span>Make it yours today</span>,
            imgSrc: "/books.jpg"
        };
    }
    return x;
});
console.log(List);
const FilterableList: NextPage = props => {
    const [displayList, setList] = React.useState<Item[]>(List);
    const [searchTerm, setTerm] = React.useState<string>("");
    const classes = useStyles(props);

    React.useEffect(() => {
        setList(
            List.filter(item => {
                if (searchTerm)
                    return item.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                else return true;
            })
        );
    }, [searchTerm]);

    return (
        <section>
            <label className={classes.inputLabel}>
                Search for an item&nbsp;
                <input
                    type="text"
                    placeholder="Start typing"
                    value={searchTerm}
                    onChange={e => setTerm(e.target.value)}
                />
            </label>
            <article className={classes.section}>
                {displayList.map(item => {
                    return (
                        <div className={classes.root} key={item.id}>
                            <h2>{item.title}</h2>
                            <figure>
                                <img src={item.imgSrc} alt="Item image" />
                                <figcaption>{item.subtitle}</figcaption>
                                {item.description}
                            </figure>
                        </div>
                    );
                })}
            </article>
        </section>
    );
};

export default FilterableList;
