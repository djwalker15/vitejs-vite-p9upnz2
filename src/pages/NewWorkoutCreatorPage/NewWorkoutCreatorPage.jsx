import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMeasure } from "@uidotdev/usehooks";
import NewWorkoutCreator from "../../components/NewWorkoutCreator/NewWorkoutCreator.jsx";

export default function NewWorkoutCreatorPage() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["exercises"],
    queryFn: async () => {
      const response = await axios.get(
        "https://us-central1-stack-alpha-01.cloudfunctions.net/exercises"
      );
      return response.data;
    },
  });

  const [ref, { width, height }] = useMeasure();

  return (
    <div id="workout-creator">
      <h1>Workout Creator</h1>
      {isPending ? (
        <h2>Loading...</h2>
      ) : (
        <div ref={ref}>
            <NewWorkoutCreator size={width} data={data} />
        </div>
      )}
    </div>
  );
}
