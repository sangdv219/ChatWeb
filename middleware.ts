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

// step 1
// step 2
// step 3