import SignInForm from "~/components/auth/SignInForm";
import Wrapper from "~/components/Wrapper";

export default function page() {
    return (
        <Wrapper className="max-w-lg">
            <SignInForm />
        </Wrapper>
    );
}
