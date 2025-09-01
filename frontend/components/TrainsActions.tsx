"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./TrainsActions.module.css";
import { ToastContainer, toast } from "react-toastify";
import { deleteTrain } from "../lib/api/clientApi";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TrainsActions({ trainId }: { trainId: number }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutationDelete = useMutation({
    mutationFn: (trainId: number) => deleteTrain(trainId),
    onError: () => {
      toast.error("There was an error while deleting.");
    },
    onSuccess: () => {
      toast.success("Train was deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["trains"] });
    },
  });
  const handleDelete = async (trainId: number) => {
    await mutationDelete.mutate(trainId);
    router.push("/trains");
  };
  return (
    <>
      <ToastContainer />
      <ul className={css.actions}>
        <li>
          <Link
            href={`/trains/actions/update?trainId=${trainId}`}
            className={css.updateBtn}
          >
            Update
          </Link>
        </li>
        <li>
          <button
            className={css.deleteBtn}
            onClick={() => handleDelete(trainId)}
          >
            Delete
          </button>
        </li>
      </ul>
    </>
  );
}
