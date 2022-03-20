import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../config/axiosClient';
import Alert from '../components/Alert';

const NewPassword = () => {

  const [password, setPassword] = useState('');
  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});
  const [passwordModified, setPasswordModified] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axiosClient(`/users/forgot-password/${token}`);
        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    };
    checkToken();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        msg: "password at least 6 characters min",
        error: true,
      });
      return;
    }

    try {
      const url = `/users/forgot-password/${token}`;
      const { data } = await axiosClient.post(url, { password });
      setAlert({
        msg: data.msg,
        error: false
      });
      setPasswordModified(true);
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
        Recover your password to manage your
        <span className="text-slate-700"> projects </span>
      </h1>

      {msg && <Alert alert={alert} />}

      {validToken && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="Type a new password"
            >Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Your new password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              autoComplete='off'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="New password"
            className="bg-sky-700 mb-5 w-full py-3 text-white uppercase
                  font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}
      {passwordModified && (<Link
        className='block text-center my-5 text-slate-500 uppercase text-sm'
        to="/"
      >
        Sing In
      </Link>)}
    </>
  )
}

export default NewPassword;