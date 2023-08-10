import React, { useContext, useRef } from "react";
import Modal from "react-modal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Button, Typography } from "@material-tailwind/react";
import InputValidate from "../Input/InputValidate";
import { FormProvider, useForm } from "react-hook-form";
import { AuthContext } from "../../context/auth-context";
import { MyContextValue } from "../../models/ContextType";
import { db } from "../../firebase-app/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");
const FormAdd = ({ openModel, setOpenModel }:{openModel:boolean, setOpenModel:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const { userInfo } = useContext(AuthContext) as MyContextValue;
  const form = useRef();
  const schema = yup.object({
    title: yup
      .string()
      .required("Tiêu đề là bắt buộc")
      .min(1, "Tiêu đề quá ngắn")
      .max(100, "Tiêu đề quá dài"),
    content: yup
    .string()
    .required("Nội dung là bắt buộc")
    .min(1, "Nội dung quá ngắn")
    .max(100, "Nội dung quá dài"),
  });
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { handleSubmit } = methods;
  const handleSave = async (data:{title:string, content:string}) => {
    const streamRef = collection(db, "stream");
    try {
      await toast.promise(
        addDoc(streamRef, {
          title: data.title,
          content:data.content,
          author: userInfo?.uid
        }),
        {
          pending: "Đang lưu dữ liệu",
          success: "Lưu thành công!",
          error: "Có lỗi xảy ra.",
        }
      );
      setOpenModel(false)
    } catch (error) {
      console.log('error: ', error);
    }
  
  };
  return (
    <Modal
      isOpen={openModel}
      //   onAfterOpen={afterOpenModal}
      //   onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Thêm mới
        </Typography>
        <FormProvider {...methods}>
          <form
            ref={form}
            onSubmit={handleSubmit(handleSave)}
            className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
          >
            <div className="flex flex-col gap-4 mb-4">
              <InputValidate placeholder="Tiêu đề" name="title" />
              <InputValidate placeholder="Nội dung" name="content" />
            </div>
            <div className="flex items-center gap-3">
              <Button className="mt-6" fullWidth type="submit">
                Lưu thông tin
              </Button>
              <Button className="mt-6 bg-red-500" fullWidth onClick={()=> setOpenModel((prev)=> !prev)}>
                Thoát
              </Button>
            </div>
          </form>
        </FormProvider>
      </Card>
    </Modal>
  );
};

export default FormAdd;
