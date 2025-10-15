import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ProfileForm from "../components/Dashboard/Profile/ProfileForm";
import ProfileButtons from "../components/Dashboard/Profile/ProfileButtons";
import PasswordChangeForm from "../components/Dashboard/Profile/PasswordChangeForm";
import useAuthContext from "../hook/useAuthContext";
import ErroAlert from "../components/ErroAlert";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUserProfile, changePassword, errorMsg } =
    useAuthContext();
  
  const {
    register,
    formState: { errors, isSubmitting },
    watch,
    // reset,  // use reset instead of setValue for multiple field
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    Object.keys(user.data).forEach((key) => setValue(key, user.data[key]));
    // setValue("first_name",user.first_name)
    console.log(user);
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      // Password Update
      const profilePayload = {
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        phone_number: data.phone_number,
      };
      //  console.log("Payload:", profilePayload);
      await updateUserProfile(profilePayload);
      //  Password Change
      if (data.current_password && data.new_password) {
        await changePassword({
          current_password: data.current_password,
          new_password: data.new_password,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect(() => {
  //     if (user) {
  //       reset({
  //         first_name: user.first_name,
  //         last_name: user.last_name,
  //         email: user.email,
  //       });
  //     }
  //   }, [user, reset]);
  return (
    <div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl">
      <div className="card-body">
        {errorMsg && <ErroAlert error={errorMsg} />}
        <h2 className="card-title text-2xl mb-4">Profile Information</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ProfileForm
            register={register}
            errors={errors}
            isEditing={isEditing}
          />
          <PasswordChangeForm
            errors={errors}
            register={register}
            isEditing={isEditing}
            watch={watch}
          />

          <ProfileButtons
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

export default Profile;
