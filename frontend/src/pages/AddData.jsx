import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
const AddData = () => {
  const {
    register,
    handleSubmit,
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

  const addsubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:9000/create", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      });
      console.log(response.data);
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
          onSubmit={handleSubmit(addsubmit)}
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

            <button onSubmit={addsubmit}>add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddData;

