
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [secondPassword, setSecondPassword] = useState('')
  const [alert, setAlert] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();
    if ([name, email, password, secondPassword].includes('')) {
      setAlert({
        msg: `All fields are required`,
        error: true
      })
      return
    }

    if (password !== secondPassword) {
      setAlert({
        msg: `The passwords aren't equals `,
        error: true
      })
      return
    }

    if (password.length < 6 ) {
      setAlert({
        msg: `The password is too short, min.  6 characters`,
        error: true
      })
      return
    }
    setAlert({});
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        name,
        email,
        password
      });
      setAlert({
        msg: data.msg,
        error: false
      });

      setName('');
      setEmail('');
      setPassword('');
      setSecondPassword('');

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error:true
      })
    }
  }
  const {msg} = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Create an account to manage your
        <span className="text-slate-700"> projects </span>
      </h1>

      { msg && <Alert alert={alert} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="name"
          >Name
          </label>
          <input
            id="Name"
            type="text"
            placeholder="Your Name"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            autoComplete="off"
            value={name}
            onChange={e => setName(e.target.value)}
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
            autoComplete="off"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
            autoComplete="off"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="secondPassword"
          >Repeat Password
          </label>
          <input
            id="secondPassword"
            type="password"
            placeholder="Repeat your password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            autoComplete="off"
            value={secondPassword}
            onChange={e => setSecondPassword(e.target.value)}
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