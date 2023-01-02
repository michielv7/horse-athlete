import { LoginForm } from '#/components/login/LoginForm';

export default function Page() {
  return (
    <section className="gradient-form bg-1B1C1E h-full ">
      <div className="container h-full py-12 px-6">
        <div className="g-6 bg-1B1C1E flex h-full flex-wrap items-center justify-center">
          <div className="xl:w-10/12">
            <div className="w-2/2 block rounded-lg bg-white shadow-lg">
              <div className="">
                <div className="lg:w-12/12 m-auto px-4 md:px-0">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <h4 className="font-Thasadith mt-1 mb-12 pb-1 text-4xl font-semibold text-gray-900">
                        HorseAthlete
                      </h4>
                    </div>
                    <LoginForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
