import { useLoaderData } from 'react-router-dom';

function Dashboard() {
  const loaderData = useLoaderData();
  return (
    <>
      <h1>Dashboard Component</h1>
      {JSON.stringify(loaderData)}
      {/* {loaderData} */}
    </>
  );
}

export default Dashboard;

export const loader = async () => {
  try {
    const res = await fetch(
      'https://data-bloom-be.onrender.com/api/v1/google-sheets-pipelines'
    );

    if (!res.ok) {
      throw new Response(
        JSON.stringify({ status: false, message: 'something went wrong' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    return res;
  } catch (err) {
    // throw new Response(JSON.stringify({ status: false, message: err.error }), {
    //   status: 500,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
    return err;
  }
};
