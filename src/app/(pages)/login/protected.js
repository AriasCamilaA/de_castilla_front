const { getSession } = require("next-auth/react");

const ProtectedPage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <p>No estás autenticado</p>;
  }

  return (
    <div>
      <h1>Página protegida</h1>
      <p>Bienvenido, {session.user.name}</p>
    </div>
  );
};

export default ProtectedPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
