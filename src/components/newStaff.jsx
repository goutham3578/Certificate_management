import { useRef } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useStores } from "../store/index";

export default function NewStaff() {
  const { branch } = useParams();
  const navigate = useNavigate();
  const { UserStore } = useStores();
  const showBranch = () => {
    navigate(`/${branch}`);
  };
  const nameref = useRef();
  const idref = useRef();
  const emailref = useRef();
  const branchref = useRef();

  const postDetails = (e) => {
    e.preventDefault();
    try {
      const name = nameref.current.value;
      const id = idref.current.value;
      const email = emailref.current.value;
      const branch = branchref.current.value;
      UserStore.postLecturers(name, id, email, branch);
      // const data = {
      //     name,
      //     id,
      //     email,
      //     branch
      // }
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-[100%] py-4 bg-secondary rounded-tr-[100px] ">
      <button
        className="flex items-center w-[20%] mx-4  text-lg"
        onClick={showBranch}
      >
        <AiOutlineLeft className="mr-1" /> Back
      </button>
      <h1 className="text-center text-2xl font-semibold mt-[3%]">
        Edit Details{" "}
      </h1>

      <form
        onSubmit={postDetails}
        className="flex flex-col w-[90%] mx-auto h-full"
      >
        <div className="flex flex-col mt-2">
          <label className="pb-2 font-semibold">Name</label>
          <input
            ref={nameref}
            type="text"
            className="bg-secondary mb-1 px-1  text-opacity-80 text-xl focus:outline-none border-b-2 border-black"
          />
        </div>
        <div className="flex flex-col mt-1">
          <label className="pb-2 ">I'd Number</label>
          <input
            ref={idref}
            type="text"
            className="bg-secondary mb-1 px-1  text-lg text-opacity-80 focus:outline-none border-b-2 border-black"
          />
        </div>
        <div className="flex flex-col mt-1">
          <label className="pb-2 ">E-mail</label>
          <input
            ref={emailref}
            type="text"
            className="bg-secondary mb-1 px-1 text-lg text-opacity-80 focus:outline-none border-b-2 border-black"
          />
        </div>
        <div className="flex flex-col mt-1">
          <label className="pb-2 ">Branch</label>
          <select
            ref={branchref}
            type="text"
            className=" mb-1  px-1 bg-secondary border-b-2 border-black text-opacity-80  text-lg focus:outline-none  "
          >
            <option className="text-xs bg-white" value="Mech">
              Mechanical Engineering
            </option>
            <option className="text-xs bg-white" value="EEE">
              Electrical Engineering
            </option>
            <option className="text-xs bg-white" value="ECE">
              Electronics Engineering
            </option>
            <option className="text-xs" value="Civil">
              Civil Engineering
            </option>
          </select>
        </div>

        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="w-[30%] px-8 my-3 mx-1 py-1 bg-primary text-white rounded-lg text-base"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
