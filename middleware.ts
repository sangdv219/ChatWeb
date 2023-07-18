import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/"
    }
});

export const config = {
    matcher: [
        "/users/:path*",
        "/conversations/:path*",
    ]
}

//text git merge
//develop test
//master test
//develop test
//master test