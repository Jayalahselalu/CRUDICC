import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect} from "react";

const EditData = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nama: " ",
      kelas: " ",
      prodi: " ",
    },
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const {id}= useParams();

  useEffect(() => {
    getDataId()
  }, [])

  const getDataId = async () => {
    try {
        const response = await axios.get(`http://localhost:9000/read/${id}`)
        console.log(response.data.data);
        const res = await response.data.data;
        setValue("nama", res.nama);
        setValue("kelas", res.kelas);
        setValue("prodi", res.prodi);
    } catch (error) {
        console.error(error);
    }
  }

  const editSubmit = async (data) => {
    try {
      const response = await axios.put(`http://localhost:9000/update/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }
    );
    console.log(response);
    navigate("/view");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit(editSubmit)}
          className="flex flex-col item-center justify-center w-[50vw] h-[60vh] shadow-md border-2"
        >
          <h1>Add Data</h1>
          {/* Nama */}
          <div className="flex flex-col gap-1">
            <label htmlFor="nama">Nama</label>
            <input
              type="text"
              id="nama"
              placeholder="masukan nama"
              className="p-4 bg-slate-100 rounded-r"
              {...register("nama", { required: "nama harus di isi " })}
            />
            {errors.nama && (
              <span className="text-red-600">{errors.nama.message}</span>
            )}
          </div>

          {/* Kelas */}
          <div className="flex flex-col gap-1">
            <label htmlFor="kelas">Kelas</label>
            <input
              type="text"
              id="kelas"
              placeholder="masukan kelas"
              className="p-4 bg-slate-100 rounded-r"
              {...register("kelas", { required: "nama harus di isi " })}
            />
            {errors.kelas && (
              <span className="text-red-600">{errors.kelas.message}</span>
            )}
          </div>

          {/* prodi */}
          <div className="flex flex-col gap-1">
            <label htmlFor="prodi">Prodi</label>
            <input
              type="text"
              id="prodi"
              placeholder="masukan prodi"
              className="p-4 bg-slate-100 rounded-r"
              {...register("prodi", { required: "nama harus di isi " })}
            />
            {errors.prodi && (
              <span className="text-red-600">{errors.prodi.message}</span>
            )}

            <button className=" w-[10vh] h-[5vh] mt-10 text-white bg-blue-500 font-semibold hover:bg-blue-400">
                Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditData;
