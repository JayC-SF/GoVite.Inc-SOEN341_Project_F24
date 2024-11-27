import { Link } from "react-router-dom";
import { AuthRoutes } from "../../network/routes";
import { useRequireUnauthenticated } from "../../hooks/auth";
import Footer from "../../modules/Footer";

export default function LoginPage() {
    const isLoggedOut = useRequireUnauthenticated()
    return (
        isLoggedOut &&
        <>
            <div className="min-h-screen flex flex-col">
                {/* Header */}
                <div className="mx-auto">
                    <header className="absolute inset-x-0 top-0 z-50">
                        <nav
                            aria-label="Global"
                            className="flex items-center justify-between p-6 lg:px-8"
                        >
                            <div className="flex lg:flex-1">
                                <a href="/" className="-m-1.5 p-1.5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-6 mx-auto w-auto logo-hat-sm"
                                    >
                                        <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                                        <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                                        <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
                                    </svg>
                                    <p className="font-black italic text-2xl"> RateMyPeers</p>
                                </a>
                            </div>
                        </nav>
                    </header>
                </div>
                <div />


                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8 mt-14 w-7/12 rounded-xl shadow-2xl bg-zinc-100/35 mx-auto">
                    {/* Background gradient color */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    >
                        <div
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        />
                    </div>

                    {/* Login Form */}
                    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-md w-full space-y-8">
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-16 mx-auto w-auto"
                                >
                                    <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                                    <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                                    <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
                                </svg>
                                <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                                    Log in to your account
                                </h2>
                                <p className="mt-2 text-center text-sm text-gray-600">
                                    Or Sign up for a new account as a {" "}
                                    <Link
                                        to="/sign-up/student"
                                        className="font-medium text-[#ca3448] hover:text-[#E9D3D7]"
                                    >
                                        Student
                                    </Link>{" "}
                                    or{" "}
                                    <Link
                                        to="/sign-up/teacher"
                                        className="font-medium text-[#ca3448] hover:text-[#E9D3D7]"
                                    >
                                        Teacher
                                    </Link>
                                </p>
                            </div>
                            <form className="mt-8 space-y-6" action={AuthRoutes.login} method="POST">
                                <div className="-space-y-px rounded-md shadow-sm">
                                    <div>
                                        <label htmlFor="email" className="sr-only">
                                            Email address
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder:text-gray-400 focus:border-[#ca3448] focus:outline-none focus:ring-[#ca3448] sm:text-sm"
                                            placeholder="Email address"
                                        />
                                    </div>
                                    <div>
                                        <br></br>
                                        <label htmlFor="password" className="sr-only">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder:text-gray-400 focus:border-[#ca3448] focus:outline-none focus:ring-[#ca3448] sm:text-sm"
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            value="true"
                                            className="h-4 w-4 rounded border-gray-300 text-[#ca3448] focus:ring-[#ca3448]"
                                        />
                                        <label
                                            htmlFor="remember-me"
                                            className="ml-2 block text-sm text-gray-900"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="text-sm">
                                        <a
                                            href="#"
                                            className="font-medium text-[#ca3448] hover:text-[#E9D3D7]"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md border border-transparent bg-[#ca3448] py-2 px-4 text-sm font-semibold text-white hover:bg-[#E9D3D7] hover:text-[#2c2c2c] focus:outline-none focus:ring-2 focus:ring-[#ca3448] focus:ring-offset-2"
                                    >
                                        Log in
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <br></br><br></br><br></br>
                <Footer />
            </div>
        </>
    );
}
