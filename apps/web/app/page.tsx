import pgClient from "db/client";

const Home = async () => {
  const users = await pgClient.user.findMany();

  return (
    <div className="text-center">
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h1>Name: {user.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default Home;

export const dynamic = 'force-dynamic';