export default function Page({ children }) {
    return (
        <div className="bg-login-background bg-cover bg-center h-screen w-screen relative flex flex-col items-center place-content-center">
            {children}
        </div>
    );
}
