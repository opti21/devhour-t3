import { Session } from "next-auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "../utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const episodeSchema = z.object({
  episodeNumber: z.string().transform((val) => parseInt(val)),
  title: z.string(),
  youtubeLink: z.string(),
  description: z.string(),
  image: z.string(),
});

type Inputs = z.infer<typeof episodeSchema>;

const AddEpisodeForm: React.FC<{ session: Session | null }> = ({ session }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(episodeSchema),
  });
  const { mutate } = trpc.useMutation(["auth.add-episode"], {
    onSuccess: (data) => {
      toast.success(`Added episode #${data.episodeNumber}`);
      reset();
    },
    onError: (errors) => {
      console.error(errors);
      toast.error("Error adding episode");
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data);
  };

  if (!session) {
    return (
      <div>
        <div className="text-white">You are not signed in</div>
      </div>
    );
  }
  if (session.user.role != "admin") {
    return (
      <div>
        <div className="text-white">You are not an admin</div>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-indigo-700 p-4 mt-6 rounded-xl"
      >
        <div className="mb-6">
          <label
            htmlFor="episode-number"
            className="block mb-2 text-sm font-medium text-white"
          >
            Episode Number
          </label>
          <input
            id="episode-number"
            type="number"
            placeholder="Episode Number"
            {...register("episodeNumber", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5"
          />
          {errors.episodeNumber && (
            <span className="text-red-600">{errors.episodeNumber.message}</span>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-white"
          >
            Title
          </label>
          <input
            id="title"
            placeholder="Episode Title"
            {...register("title", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5"
          />
          {errors.title && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="youtube"
            className="block mb-2 text-sm font-medium text-white"
          >
            Youtube Link
          </label>
          <input
            id="youtube"
            placeholder="Youtube Link"
            {...register("youtubeLink", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5"
          />
          {errors.youtubeLink && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="desc"
            className="block mb-2 text-sm font-medium text-white"
          >
            Description
          </label>

          <input
            id="desc"
            placeholder="Description"
            {...register("description", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5"
          />
          {errors.description && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-white"
          >
            Image
          </label>
          <input
            id="image"
            placeholder="Image"
            {...register("image", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5"
          />
          {errors.image && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>

        <input
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:cursor-pointer"
        />
      </form>
    </div>
  );
};

export default AddEpisodeForm;
