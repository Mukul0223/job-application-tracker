import { SignIn } from '@clerk/react';

const SignInPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl="/dashboard"
      />
    </div>
  );
};

export default SignInPage;
