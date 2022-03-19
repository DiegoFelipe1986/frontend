

const NewPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recover your password to manage your
        <span className="text-slate-700"> projects </span>
      </h1>
      <form className="my-10 bg-white shadow rounded-lg p-10">
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
            autoComplete='false'
          />
        </div>
        <input
          type="submit"
          value="New password"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase
            font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  )
}

export default NewPassword;