import Footer from "../../modules/Footer";

export default function HomePage() {
  return (
    <div className="bg-white">
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

          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-3">
            <a
              href="#sign-up"
              className="hover:bg-[#E9D3D7] bg-[#ca3448] active:bg-[#fce7e7] hover:text-[#2c2c2c] text-white rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </a>
            <a
              href="/login"
              className="hover:bg-[#E9D3D7] bg-[#ca3448] active:bg-[#fce7e7] hover:text-[#2c2c2c] text-white rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:shadow-sm"
            >
              Login
            </a>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
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
        <div className="mx-auto max-w-2xl sm:pt-32 sm:pb-48 lg:pt-44 lg:pb-56">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-12 mx-auto w-auto logo-hat"
            >
              <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
              <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
              <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
            </svg>

            <h1 className="text-9xl font-bold tracking-tight text-gray-900 sm:text-5-5xl">
              Welcome to{" "}
              <span className="font-black italic text-[#ca3448] hover-underline">
                RateMyPeers
              </span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              <span className="italic pr-1">RateMyPeers</span>
              is a Peer Assessment System for university team projects.
              <br /> It is designed to allow students to evaluate the
              contributions and performance of their teammates
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#sign-up"
                className="hover:bg-[#E9D3D7] bg-[#ca3448] active:bg-[#fce7e7] hover:text-[#2c2c2c] text-white w-32 rounded-md px-3.5 py-2.5 text-lg font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
      <hr></hr>

      {/* Sign Up Section */}
      <section id="sign-up" className="px-12">
        <div className="flex flex-row min-h-full mt-10 mx-auto shadow-2xl rounded-2xl border relative">
          <div className="flex-col w-11/12 p-10 justify-center content-center overflow-hidden">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm z-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-16 mx-auto w-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>

              <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Get Started.
              </h2>
            </div>
            <div className="flex z-50">
              {" "}
              <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="divide-y divide-gray-300/50">
                  <div className="flex flex-col py-8 gap-5 text-base leading-3 text-gray-600">
                    <a href="/sign-up/student" className="mx-16">
                      <div className="relative max-w-lg rounded-lg hover:bg-[#E9D3D7] bg-[#ca3448] active:bg-[#fce7e7] hover:text-[#2c2c2c] text-white font-bold px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 hover:cursor-pointer text-center">
                        Student
                      </div>
                    </a>
                    <a href="/sign-up/teacher" className="mx-16">
                      <div className="relative max-w-lg rounded-lg hover:bg-[#E9D3D7] bg-[#ca3448] active:bg-[#fce7e7] hover:text-[#2c2c2c] text-white font-bold px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 hover:cursor-pointer text-center">
                        Teacher
                      </div>
                    </a>
                  </div>
                  <div className="pt-4 text-base font-semibold leading-7"></div>
                </div>

                <p className="font-medium mt-10 text-center text-sm text-gray-500">
                  Already a member?
                  <br />
                  <a
                    href="/login"
                    className="font-semibold leading-6 text-[#aa263b] hover:text-[#ca3448]"
                  >
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Concordia */}
          <div className="flex z-50">
            <div>
              <img
                src="https://www.concordia.ca/content/concordia/en/admissions/undergraduate/university-life/2-campuses/_jcr_content/content-main/grid_container_945895843/grid-container-parsys/offset_block/adaptiveimage.img.full.medium.jpg/1650918615262.jpg"
                alt="concordia"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>
      <br></br><br></br><br></br>
      <Footer />
    </div>
  );
}
