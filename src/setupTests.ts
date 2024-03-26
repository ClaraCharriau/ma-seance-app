// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { fetch, Request, Response } from '@remix-run/web-fetch';

if (!globalThis.fetch) {
    // Built-in lib.dom.d.ts expects `fetch(Request | string, ...)` but the web
    // fetch API allows a URL so @remix-run/web-fetch defines
    // `fetch(string | URL | Request, ...)`
    // @ts-expect-error desc
    globalThis.fetch = fetch;
    // Same as above, lib.dom.d.ts doesn't allow a URL to the Request constructor
    // @ts-expect-error desc
    globalThis.Request = Request;
    // web-std/fetch Response does not currently implement Response.error()
    // @ts-expect-error desc
    globalThis.Response = Response;
}
