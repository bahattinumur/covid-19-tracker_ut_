import { CiSearch } from "react-icons/ci";

const Form = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="flex items-center border rounded">
      <input
        className="bg-transparent text-md py-1 px-0 md:px-5 outline-none "
        type="text"
        placeholder="Search by Country"
      />

      <button className="bg-green-500 text-md p-1 md:p-1 w-auto h-auto rounded transition hover:bg-green-600">
        <CiSearch />
      </button>
    </form>
  );
};

export default Form;
