import { Box, Card, CardContent, CardHeader, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import './WorkoutsPage.css'

export default function WorkoutsPage() {
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ["workouts"],
        queryFn: async () => {
            const response = await axios.get(
                "https://getworkoutswithexercises-234084537667.us-south1.run.app"
            );
            return response.data;
        },
    });

    console.log(data)

    let workouts = isPending ? [] : data.map(x => {
        return <Card className="workout" key={x["ID"]}>
            <CardHeader title={"Workout ".concat(x.ID)} />
            <CardContent className="exerciseCard">
                {x["Exercises"].map(y => {
                    return <Card key={y.ID} className="exercise" component="img" src={y.ImageLink} alt={y.Name} />
                })}
            </CardContent>
        </Card>
    })
    return (
        <div>
            <h1>Workouts</h1>
            <div className="workouts">
                {workouts}
            </div>
        </div>
    )
}