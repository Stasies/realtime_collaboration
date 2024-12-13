import { useParams } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { socket } from "@/hooks/socket";
type PropFunction = (value: boolean) => void;

async function sendRequest(
  url: string,
  { arg }: { arg: { coords: number[] } }
) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}
const Tools: React.FC<{ setDrawingMode: PropFunction }> = ({
  setDrawingMode,
}) => {
  const params = useParams();
  const { trigger: createNote } = useSWRMutation(
    `/api/room/${params.id}/notes`,
    sendRequest
  );
  const { trigger: createTextField } = useSWRMutation(
    "/api/texts",
    sendRequest
  );
  const { trigger: createRoom } = useSWRMutation("/api/room", sendRequest);
  return (
    <div className="fixed left-10 top-40 z-50 border-2 border-gray-600">
      <div onClick={() => setDrawingMode(false)}>Курсор</div>
      <div onClick={() => setDrawingMode(true)}>Рисовать</div>
      <div
        onClick={async () =>
          await createTextField({
            coords: [100, 300],
          })
        }
      >
        text
      </div>
      <div
        onClick={() =>
          socket.emit("noteCreated", {
            coords: [100, 300],
          })
        }
      >
        note
      </div>
      <div onClick={async () => await createRoom()}>room</div>
    </div>
  );
};

export default Tools;
