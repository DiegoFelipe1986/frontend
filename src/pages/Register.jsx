
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Create an account to manage your
        <span className="text-slate-700"> projects </span>
      </h1>
      <form className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="name"
          >Name
          </label>
          <input
            id="Name"
            type="Name"
            placeholder="Your Name"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            autoComplete='false'
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email registered"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            autoComplete='false'
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Your password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            autoComplete='false'
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password2"
          >Repeat Password
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Repeat your password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            autoComplete='false'
          />
        </div>
        <input
          type="submit"
          value="Create account"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase
            font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
            <Link
                className='block text-center my-5 text-slate-500 uppercase text-sm'
                to="/"
            >
                Already you have an account? Sing In
            </Link>
            <Link
                className='block text-center my-5 text-slate-500 uppercase text-sm'
                to="/forgot-password"
            >
                Forget my password
            </Link>
        </nav>
    </>
  )
}

export default Register