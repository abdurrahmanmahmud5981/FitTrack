import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useGetRole from "../../../hooks/useGetRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddNewForum = () => {
  const { user } = useAuth();
  const [role] = useGetRole();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const forumData = {
        ...data,
        author: user?.displayName,
        authorImage: user?.photoURL,
        role,
        date: new Date().toISOString().split("T")[0],
        votes: { upvotes: 0, downvotes: 0 },
      };
      console.log("Forum Data:", forumData);
      const res = await axiosSecure.post("/forum-posts", forumData);
      if (res.data?.insertedId) {
        Swal.fire({
          title: "Forum Post Created Successfully!",
          icon: "success",
          confirmButtonText: "Cool",
        });
        reset();
      }
    } catch (error) {
      Swal.fire({
        title: `Failed to Create Forum Post! ${error.message}`,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <Typography variant="h4" color="blue-gray" className="font-bold">
          Add New Forum
        </Typography>
        <Typography variant="paragraph" className="text-gray-600">
          Fill out the details below to create a new forum post.
        </Typography>
      </div>

      <Card className="shadow-lg">
        <CardBody>
          {/* Forum Form */}
          <div className="border-t pt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Forum Title
                </label>
                <Input
                  type="text"
                  placeholder="Enter forum title"
                  {...register("title", { required: "Title is required" })}
                  error={errors.title ? true : false}
                />
                {errors.title && (
                  <span className="text-red-500 text-sm">
                    {errors.title.message}
                  </span>
                )}
              </div>

              {/* Content */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Forum Content
                </label>
                <textarea
                  placeholder="Write forum content..."
                  {...register("content", { required: "Content is required" })}
                  className="border rounded w-full p-2 h-32"
                ></textarea>
                {errors.content && (
                  <span className="text-red-500 text-sm">
                    {errors.content.message}
                  </span>
                )}
              </div>

              {/* Link */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  External Link (Optional)
                </label>
                <Input
                  type="url"
                  placeholder="Add an optional link"
                  {...register("link")}
                  className="input-field"
                />
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  color="orange"
                  type="submit"
                  fullWidth
                  className="transition-all duration-300 hover:shadow-lg"
                >
                  Add Forum
                </Button>
              </div>
            </form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddNewForum;
