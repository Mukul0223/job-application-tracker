import { SignUp } from '@clerk/react';

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl="/dashboard"
      />
    </div>
  );
};

export default SignUpPage;
