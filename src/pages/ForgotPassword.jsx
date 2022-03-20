import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert'
import axiosClient from '../config/axiosClient';

const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if (email === '' || email.length < 6) {
      setAlert({
        msg: 'Email is mandatory',
        error: true
      });
      return;
    }

    try {
      const {data} = await axiosClient.post(`/users/forgot-password`, {email});
      setAlert({
        msg: data.msg,
        error: false
      });
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      });
    }

  }

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recover manage of your
        <span className="text-slate-700"> projects </span>
      </h1>
      {msg && <Alert alert={alert} />}
      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
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
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Send Instructions"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase
            font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          value="Recover password"
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
          to="/register"
        >
          Don't you have an account? Register
        </Link>

      </nav>
    </>
  )
}

export default ForgotPassword