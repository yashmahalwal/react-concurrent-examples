// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html as HTML, Head, Main, NextScript } from "next/document";
import ServerStyleSheets from "@material-ui/styles/ServerStyleSheets";
import React from "react";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        // Resolution order
        //
        // On the server:
        // 1. app.getInitialProps
        // 2. page.getInitialProps
        // 3. document.getInitialProps
        // 4. app.render
        // 5. page.render
        // 6. document.render
        //
        // On the server with error:
        // 1. document.getInitialProps
        // 2. app.render
        // 3. page.render
        // 4. document.render
        //
        // On the client
        // 1. app.getInitialProps
        // 2. page.getInitialProps
        // 3. app.render
        // 4. page.render

        // Render app and page and get the context of the page with collected side effects.
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: App => props => sheets.collect(<App {...props} />)
            });
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
        };
    }

    render() {
        return (
            <HTML lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <style>
                        {`html, body{
                            margin: 0;
                            padding: 0;
                        }`}
                    </style>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </HTML>
        );
    }
}

export default MyDocument;