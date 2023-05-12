import { useAuthHeader, useSignIn } from "react-auth-kit";

const useUpdateReactAuthKitUserState = () => {
    const signIn = useSignIn();
    const authHeader = useAuthHeader();

    const [tokenType, token] = authHeader().split(" ");

    if (!tokenType || !token) {
        return () => {};
    }

    return (user) => {
        signIn({
            token,
            tokenType,
            expiresIn: 1000 * 60 * 60 * 24 * 7,
            authState: user,
        });
    };
};

export default useUpdateReactAuthKitUserState