import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import NavBar from "../components/Navbar";
import { useEffect, useContext, useState } from "react";
import { db } from "../firebase-app/firebase-config";
import { MyContextValue } from "../models/ContextType";
import { AuthContext } from "../context/auth-context";
import FormAdd from "../components/Modal/FormAdd";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/outline";
interface StreamType {
  id: string;
  author: string;
  content: string;
  title: string;
}
const HomePage = () => {
  const { userInfo } = useContext(AuthContext) as MyContextValue;
  const [stream, setStream] = useState<StreamType[]>([]);
  const [openModel, setOpenModel] = useState(false);
  useEffect(() => {
    const colRef = collection(db, "stream");
    const refCheck =
      userInfo?.uid === "OAJZZNGcxTWaSPCNJzMfk1crVkC3"
        ? colRef
        : query(colRef, where("author", "==", userInfo?.uid || "h"));
    onSnapshot(refCheck, (snapshot) => {
      const resStream: StreamType[] = [];
      snapshot.forEach((doc) => {
        resStream.push({
          id: doc.id,
          ...doc.data(),
        } as StreamType);
      });
      setStream(resStream);
    });
  }, [userInfo]);
  console.log(stream);

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center mt-6">
        <Button
          variant="gradient"
          className="flex items-center gap-3"
          onClick={() => setOpenModel((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Thêm mới
        </Button>
        <ListWithIcon stream={stream}></ListWithIcon>
      </div>
      <FormAdd openModel={openModel} setOpenModel={setOpenModel}></FormAdd>
    </div>
  );
};
function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
        clipRule="evenodd"
      />
    </svg>
  );
}
function ListWithIcon({ stream }: { stream: StreamType[] }) {
  const handleDeleteStream = (id: string) => {
    const colRef = doc(db, "stream", id);
    Swal.fire({
      title: "Xóa dữ liệu này ?",
      text: "Thao tác này sẽ khiến dữ liệu bị xóa vĩnh viễn ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await toast.promise(deleteDoc(colRef), {
          pending: "Đang xóa",
          success: "Xóa thành công!",
          error: "Có lỗi xảy ra.",
        });
      }
    });
  };
  return (
    <Card className="w-96">
      <List>
        {stream &&
          stream.map((item) => (
            <ListItem ripple={false} className="py-1 pl-4 pr-1" key={item.id}>
              {item.title}
              <ListItemSuffix>
                <IconButton
                  variant="text"
                  color="blue-gray"
                  onClick={() => handleDeleteStream(item.id)}
                >
                  <TrashIcon />
                </IconButton>
                <IconButton
                  variant="text"
                  onClick={() => handleDeleteStream(item.id)}
                >
                  <PencilIcon className="text-green-500"/>
                </IconButton>
              </ListItemSuffix>
            </ListItem>
          ))}
      </List>
    </Card>
  );
}

export default HomePage;
