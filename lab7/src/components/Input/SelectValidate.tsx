import { Select, Option } from "@material-tailwind/react";
import { useController, useFormContext } from "react-hook-form";
const SelectValidate = ({ placeholder, type = "text", name }) => {
  const { formState, control, setValue } = useFormContext();
  const { errors } = formState;
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  return (
    <>
      <select onChange={(e)=>setValue('gender', e.target.value, { shouldValidate: true })} name="gender" id="" className="p-3 text-gray-600 border border-gray-400 rounded-lg outline-none cursor-pointer">
        <option value="" >Giới tính</option>
        <option value="Nam">Nam</option>
        <option value="Nữ">Nữ</option>
        <option value="Khác">Khác</option>
      </select>
      {!!errors[name] && (
        <p className="text-xs text-red-300">{errors[name]?.message}</p>
      )}
    </>
  );
};

export default SelectValidate;
