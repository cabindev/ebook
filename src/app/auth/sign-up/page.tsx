import SignUpForm from "~/components/auth/SignUpForm";
import Wrapper from "~/components/Wrapper";

export default function page() {
    return (
        <Wrapper className="max-w-lg">
            <SignUpForm />
        </Wrapper>
    );
}
