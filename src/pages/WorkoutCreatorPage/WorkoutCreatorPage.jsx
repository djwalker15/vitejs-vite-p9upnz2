import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMeasure } from "@uidotdev/usehooks";
// import Library from "../components/library/library";
import WorkoutCreator from "../../components/WorkoutCreator/WorkoutCreator.jsx";

export default function WorkoutCreatorPage() {
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
    <div id="library">
      <h1>Workout Creator</h1>
      {isPending ? (
        <h2>Loading...</h2>
      ) : (
        <div ref={ref}>
            <WorkoutCreator size={width} />
        </div>
      )}
    </div>
  );
}
