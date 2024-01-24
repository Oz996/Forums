import { useAuth } from "@/hooks/useAuth";
import { getBaseUrl } from "@/lib/utils/URL";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

interface props {
  type: options;
  id: string;
}

type options = "user" | "post" | "comment";

const DeleteModal = ({ type, id }: props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { handleLogout, token } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteUser = async (id: string) => {
    try {
      const res = await axios.delete(getBaseUrl() + `/api/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        router.push("/");
        toast.success("User deleted");
        handleLogout();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (id: string) => {
    try {
      const res = await axios.delete(getBaseUrl() + `/api/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        router.push("/");
        toast.success("Post deleted");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteComment = async (id: string) => {
    try {
      const res = await axios.delete(getBaseUrl() + `/api/comment/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        toast.success("Comment deleted");
        queryClient.invalidateQueries(["post"]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = () => {
    if (userType) {
      deleteUser(id);
    } else if (postType) {
      deletePost(id);
    } else {
      deleteComment(id);
    }
  };

  const userType = type === "user";
  const postType = type === "post";
  const commentType = type === "comment";

  return (
    <>
      <Button
        color="danger"
        onPress={onOpen}
        className={classNames({
          "rounded-full": true,
          " mt-2": postType || commentType,
        })}
        variant="light"
      >
        {userType ? "Delete User" : "Delete"}
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                {userType
                  ? "User Deletion"
                  : postType
                  ? "Post Deletion"
                  : "Comment Deletion"}
              </ModalHeader>
              <ModalBody>
                <p>
                  {userType
                    ? " Are you sure you want to delete your account? Account recovery will not be possible"
                    : postType
                    ? "Are you sure you want to delete your post?"
                    : "Are you sure you want to delete this comment?"}
                </p>
              </ModalBody>
              <ModalFooter className="mx-auto">
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  onClick={() => handleDeleteClick()}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
