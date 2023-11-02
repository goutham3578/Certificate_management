import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
// import { Lectures } from '../helpers/lectures';
// import { MechStudents } from '../helpers/MechStudents';
import { Branches } from "../helpers/Branches";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PiBuildingsBold } from "react-icons/pi";
import { BsPersonCheck } from "react-icons/bs";
import { useStores } from "../store/index";
import { useObserver } from "mobx-react";

export default function BranchDetails() {
  const { UserStore } = useStores();

  return useObserver(() => (
    <>
      <div className="w-[100%] h-screen flex flex-col bg-gray-100">
        <TitleAndSearch />
        {/* Lecturers section */}
        <div className="bg-[#E4E4FF] mt-6 mx-auto w-[90%] rounded-lg">
          <LecturerSection />
        </div>
        {/* Student-list-section */}
        <div className="bg-white  drop-shadow my-6 shadow-lg w-[90%]  mx-auto rounded-lg">
          <StudentSection />
        </div>
      </div>
    </>
  ));
}

export function TitleAndSearch({ onStaff }) {
  let { branch } = useParams();
  const { AuthStore } = useStores();

  const selectedBranch = Branches.find(
    (branchname) => branchname.name === branch
  );

  const navigate = useNavigate();
  const gotoStudentApproval = () => {
    navigate(`/${branch}/studentapproval`);
  };

  const gotoProfile = () => {
    navigate(`/profile`);
  };

  const gotoHomePage = () => {
    navigate(`/principal`);
  };

  const showlecturerprofile = (id) => {
    navigate(`/${branch}/lecturer/${id}`);
  };

  return useObserver(() => (
    <>
      <div className="w-[90%] mx-auto pt-6 flex items-center">
        {!onStaff ? (
          <>
            {" "}
            <AiOutlineLeft className="text-lg" onClick={gotoHomePage} />
            <h2 className="mx-1 text-lg text-primary ">
              {selectedBranch?.name}
            </h2>
          </>
        ) : (
          <>
            <div className="mt-2 ml-auto flex">
              <div
                className="bg-secondary h-12 w-12 rounded-full mx-2"
                onClick={gotoStudentApproval}
              >
                <BsPersonCheck className="text-4xl ml-1 mt-1" />
              </div>
              <div
                className="bg-secondary h-12 w-12 rounded-full mx-2"
                onClick={gotoProfile}
              >
                <PiBuildingsBold className="text-3xl ml-2 mt-2" />
              </div>
              <div
                onClick={() => showlecturerprofile(AuthStore.user?.idno)}
                className=" mx-2 pr-2"
              >
                <img
                  className="h-12 w-12 rounded-full"
                  src={AuthStore.user?.photo}
                  alt={AuthStore.user?.name}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mt-6 relative w-[90%] mx-auto">
        <input
          type="text"
          placeholder="Search"
          className="pl-14 pr-4 py-4 w-full border-blue-400 border-2 rounded-full focus:outline-none"
        />
        <span className="absolute left-2 top-5  mx-4">
          <FaSearch className="text-lg" />
        </span>
      </div>
    </>
  ));
}

export function LecturerSection() {
  const navigate = useNavigate();
  const { UserStore } = useStores();
  const [selectedBranchLecturers, setSelectedBranchLecturers] = useState([]);

  let { branch } = useParams();



  //check verification
  useEffect(() => {
    try {
      const verifiedLecturers = UserStore?.lecturers.filter(
        (lecturer) => lecturer?.department.toUpperCase() === branch.toUpperCase() && lecturer?.isVerified === true
      );
      setSelectedBranchLecturers(verifiedLecturers);
    } catch (error) {
      console.log(error);
    }
  }, [UserStore?.lecturers]);



  const showLecturerDetails = (id) => {
    navigate(`/${branch}/lecturer/${id}`);
  };

  const addNewStaff = (branch) => {
    navigate(`/${branch}/newstaff`);
  };

  return useObserver(() => (
    <>
      <div className="flex w-[90%] justify-between items-center mt-2 mx-auto">
        <h2 className="text-2xl text-text_color1 font-semibold">Lecturers</h2>
        <button
          className="flex text-xs text-text_color1 items-center"
          onClick={() => addNewStaff(branch)}
        >
          <IoMdAddCircle className="text-base" />
          Add new Staff
        </button>
      </div>
      <div className="mt-4 w-[90%] mx-auto">
        <div className="flex overflow-x-auto  items-center pb-4">
          {selectedBranchLecturers.map((lecturer, index) => (
            <div
              key={index}
              onClick={() => showLecturerDetails(lecturer?._id)}
              className="cursor-pointer mx-4 flex flex-col items-center justify-center"
            >
              <div className="w-20 h-20 rounded-full  ">
                <img
                  src={lecturer?.photo}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              <p className="text-black ">{lecturer?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  ));
}

export function StudentSection({ onstaff }) {
  let { branch } = useParams();
  const [selectedBranchStudents, setSelectedBranchStudents] = useState([]);
  const { UserStore } = useStores();


  //check verification 
  useEffect(() => {
    try {
      const verifiedStudents = UserStore?.students.filter(
        (student) => student?.department.toUpperCase() === branch.toUpperCase() && student?.isVerified === true
      );
      setSelectedBranchStudents(verifiedStudents);
    } catch (error) {
      console.log(error);
    }
  }
    , [UserStore?.students]);

  const navigate = useNavigate();

  const showStudentDetails = (pin) => {
    navigate(`/${branch}/${pin}`);
  };

  return useObserver(() => (
    <>
      {onstaff ? (
        <>
          <div className="flex w-[90%] justify-between items-center mt-2 mx-auto">
            <h2 className="text-2xl text-text_color1 font-semibold">
              Students
            </h2>
            <button
              className="flex text-xs text-text_color1 items-center"
            // onClick={() => addNewStaff(branch)}
            >
              <IoMdAddCircle className="text-base" />
              Add new Student
            </button>
          </div>
        </>
      ) : (
        <h1 className="text-text_color1 font-semibold w-[90%] mx-auto text-2xl">
          Students
        </h1>
      )}
      {selectedBranchStudents.map((student) => (
        <>
          <div className="w-[90%] p-2 border-b-2 border-[rgba(0, 0, 0, 1)] mx-auto my-2 flex flex-row items-end justify-between">
            <div className="flex flex-row items-center">
              <img
                src={student?.photo}
                className="w-12 h-12 rounded-full"
                alt=""
              />
              <div className="flex flex-col items-start ml-3">
                <h1 className="text-lg">{student?.name}</h1>
                <p className="text-base">{student?.pinno}</p>
              </div>
            </div>
            <div className="flex">
              <button
                className="flex items-center justify-center"
                onClick={() => showStudentDetails(student?.pinno)}
              >
                view details <AiOutlineRight className="text-sm ml-1 mt-1" />{" "}
              </button>
            </div>
          </div>
        </>
      ))}
    </>
  ));
}
