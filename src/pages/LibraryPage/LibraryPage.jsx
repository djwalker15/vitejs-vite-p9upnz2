import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMeasure } from '@uidotdev/usehooks';
import Library from '../../components/Library/Library.jsx';
import { useNavigate } from 'react-router-dom';

export default function LibraryPage() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['exercises'],
    queryFn: async () => {
      const response = await axios.get(
        'https://us-central1-stack-alpha-01.cloudfunctions.net/exercises'
      );
      return response.data;
    },
  });

  const [ref, { width, height }] = useMeasure();
  const navigate = useNavigate();

  return (
    <div id="library">
      <h1>Exercise Library</h1>
      {isPending ? (
        <h2>Loading...</h2>
      ) : (
        <div ref={ref}>
          {/* <Library exercises={data} size={width} height={600} handleClick={(item) => console.log(`Clicked ${item.ID}`)}/> */}

          <Library
            exercises={data}
            size={width}
            height={600}
            handleClick={(item) => navigate(`../exercises/${item.ID}`)}
          />
        </div>
      )}
    </div>
  );
}
